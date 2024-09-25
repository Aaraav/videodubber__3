import Navbar from "../components/Navbar";
import { Button, FileButton } from '@mantine/core'; // Adjust import based on your button library
import File from "../components/File"
export default function Home() {
  return (
    <>
      <div style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#17171E",
        width: "100vw",
        height: "100vh",
        display: 'flex', 
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h2 style={{
            fontSize: '0.875rem', 
            color: 'white', 
            marginBottom: '0.5rem',
          }}>HOW IT WORKS</h2>
          <h1 style={{
            fontSize: '3.5rem', 
            fontWeight: 'bold',
            marginBottom: '1rem',
            color:"white"
          }}>Audio Speed and Pitch Changer</h1>
          <p style={{
            color: 'white', 
            marginBottom: '2rem',
            fontSize:"1.1rem",
            textAlign: 'center',
            maxWidth: '40rem', 
          }}>
            Changes pitch and tempo of the song by adjusting musical key and bpm sliders
          </p>

          <File/>
         
        </div>
      </div>
    </>
  );
}
