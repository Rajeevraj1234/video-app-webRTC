import React, { useCallback, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useSocket } from "./SocketContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [roomId, setRoomId] = useState();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeRoom = (e) => {
    setRoomId(e.target.value);
  };

  const socket = useSocket();
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("join-room", { email, roomId });
    },
    [email, roomId, socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const {email,roomId} = data;
    navigate(`/room/${roomId}`);
  });
  useEffect(() => {
    socket?.on("join-room", handleJoinRoom);
    return () => {
      socket?.off("room-join", handleJoinRoom);
    };
  }, [socket]);

  return (
    <div className="landing-main">
      <h1>Fully Private Video Call Platform</h1>
      <input
        onChange={handleChangeEmail}
        type="email"
        placeholder="Enter email"
      />
      <input onChange={handleChangeRoom} type="text" placeholder="Enter Room" />
      <button onClick={handleClick}>Join</button>
    </div>
  );
};

export default LandingPage;
