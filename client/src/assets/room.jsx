import { useCallback, useEffect,useState } from "react";
import { useSocket } from "./SocketContext";
import ReactPlayer from "react-player"

const Room = () => {
  const socket = useSocket();
  const [remoteSocketId,setRemoteSocketId] = useState(null);
  const [myStream,setMyStream] = useState(null);

  const handleUserJoin = useCallback((data) => {
    console.log(`Email ${data.email} joined the room`);
    setRemoteSocketId(data.id);
  }, []);
  useEffect(() => {
    socket?.on("user-joined", handleUserJoin);

    return () => {
      socket?.off("user-joined", handleUserJoin);
    };
  }, [socket, handleUserJoin]);

  const handleStart = useCallback(async()=>{
    const stream =  await navigator.mediaDevices.getUserMedia({audio:true,video:true})
    setMyStream(stream);
  },[])

  return <div>
    <h1>Room</h1>
    <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
    {remoteSocketId && <button onClick={handleStart}>Start</button>}
    {myStream && (
      <ReactPlayer playing muted height={"200px"} width={"400px"} url={myStream}  />
    )}
  </div>;
};

export default Room;
