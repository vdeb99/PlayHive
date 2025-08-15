import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [games, setGames] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState(''); // Added for error feedback

  useEffect(() => {
    fetchGames();
    fetchLeaderboard();
    socket.on('gameUpdate', (data) => setGameState(data));
    return () => socket.off('gameUpdate');
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/games');
      const data = await res.json();
      setGames(data);
    } catch (err) {
      console.error('Fetch games error:', err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Fetch leaderboard error:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password }); // Debug log
    setError(''); // Clear previous errors
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log('Login response:', data); // Debug log
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        console.log('Login successful, user:', data.user); // Debug log
      } else {
        setError(data.message || 'Login failed'); // Show error from backend
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Is the backend running?');
    }
  };

  const joinGame = (gameId) => {
    socket.emit('joinGame', { gameId, userId: user._id });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!user ? (
        <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Login to PlayHive</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error display */}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Available Games</h2>
              <ul className="bg-white p-4 rounded shadow">
                {games.map((game) => (
                  <li key={game._id} className="mb-2 flex justify-between items-center">
                    <span>{game.name} - {game.players.length}/{game.maxPlayers}</span>
                    <button
                      onClick={() => joinGame(game._id)}
                      className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Join
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
              <ul className="bg-white p-4 rounded shadow">
                {leaderboard.map((entry, index) => (
                  <li key={entry._id} className="mb-2">
                    {index + 1}. {entry.username} - {entry.score}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {gameState && (
            <div className="mt-6 bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Game State</h2>
              <pre className="text-sm">{JSON.stringify(gameState, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;