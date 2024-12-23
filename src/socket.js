const socket = io("http://localhost:8080");

socket.emit("update", data);
socket.on("update", (data) => {
    console.log("Update received:", data);
});
