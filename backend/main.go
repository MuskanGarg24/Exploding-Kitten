package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"sort"
	"strconv"

	"github.com/redis/go-redis/v9"
	"github.com/rs/cors"
)

var (
	ctx context.Context
	rdb *redis.Client
)

type User struct {
	Username string `json:"username"`
	Points   int    `json:"points"`
}

func main() {
	ctx = context.Background()

	rdb = redis.NewClient(&redis.Options{
		Addr:     "redis-17888.c264.ap-south-1-1.ec2.cloud.redislabs.com:17888",
		Password: "lXhwzjU8MuxwcFUJLRlKF2XkRw8pgEDW",
		DB:       0,
	})
	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		panic("Failed to connect to Redis database: " + err.Error())
	}
	fmt.Println("Connected to Redis database")

	// Setup CORS middleware
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://exploding-kitten-seven.vercel.app"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		Debug:            true,
	})

	mux := http.NewServeMux()
	mux.HandleFunc("/user", userHandler)
	mux.HandleFunc("/leaderboard", leaderboardHandler)
	mux.HandleFunc("/updatepoints", updatePointsHandler)
	mux.HandleFunc("/top3", top3Handler)

	// CORS handler
	corsHandler := c.Handler(mux)

	fmt.Println("Server is running on port 8080...")
	http.ListenAndServe(":8080", corsHandler)
}

func userHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Failed to decode request body: %v", err)
		return
	}

	// Check if the user already exists
	_, err = rdb.HGet(ctx, "users", user.Username).Result()
	if err == nil {
		// User already exists, allow them to proceed to the game
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "User already exists. Proceeding to the game.")
		return
	} else if err != redis.Nil {
		// Error other than user not existing
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Failed to check user existence in Redis: %v", err)
		return
	}

	// Store user data in Redis with initial points set to 0
	err = rdb.HSet(ctx, "users", user.Username, 0).Err()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Failed to store user data in Redis: %v", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "User data stored successfully for username: %s", user.Username)
}

func leaderboardHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	username := r.URL.Query().Get("username")
	if username == "" {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(w, "Username parameter is required")
		return
	}

	// Retrieve user data from Redis
	points, err := rdb.HGet(ctx, "users", username).Int()
	if err != nil {
		if err == redis.Nil {
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprintf(w, "User not found: %s", username)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, "Failed to retrieve user data from Redis: %v", err)
		}
		return
	}

	user := User{
		Username: username,
		Points:   points,
	}

	// Marshal user data to JSON
	jsonData, err := json.Marshal(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Failed to marshal user data to JSON: %v", err)
		return
	}

	// Set Content-Type header and write response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}

func updatePointsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, "Failed to decode request body: %v", err)
		return
	}

	// Increment user's points in Redis
	err = rdb.HIncrBy(ctx, "users", user.Username, 1).Err()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Failed to update user points in Redis: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "User points updated successfully for username: %s", user.Username)
}

func top3Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	// Retrieve all users with their points from Redis
	userMap, err := rdb.HGetAll(ctx, "users").Result()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Failed to retrieve user data from Redis: %v", err)
		return
	}

	// Convert Redis data to slice of User objects
	var users []User
	for username, pointsStr := range userMap {
		points, _ := strconv.Atoi(pointsStr)
		users = append(users, User{Username: username, Points: points})
	}

	// Sort users by points
	sort.Slice(users, func(i, j int) bool {
		return users[i].Points > users[j].Points
	})

	// Take top 3 users
	var top3Users []User
	if len(users) >= 3 {
		top3Users = users[:3]
	} else {
		top3Users = users
	}

	// Marshal top 3 users' data to JSON
	jsonData, err := json.Marshal(top3Users)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, "Failed to marshal user data to JSON: %v", err)
		return
	}

	// Set Content-Type header and write response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
