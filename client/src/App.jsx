import { useEffect, useState } from 'react';
import state from './store';

export default function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limitState, setLimitState] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {

      let limit = limitState;
      const url = new URL(`http://localhost:5000/api`);
      // here 'limit' key is the key express is expecting. The (req.query) parameter.
      url.searchParams.append('limit', limit);
      setLoading(true);
      await fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setData(data);
          setLoading(false);
      });
    }

    fetchUsers();

    // refetch when limit changes

  }, [limitState]);

  const handleLimit = (e) => {
    let limit = e.target.value;
    setLimitState(limit);
  }

  return (
    <div className='container mx-auto px-10 py-24'>
      <select onChange={handleLimit}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      <ul>
        {!loading && data ? data?.map((post) => (
          <li>
            <h1>[{post.id}]{post.title}</h1>
            <p>{post.body}</p>
          </li>
        )) : <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-sky-500 animate-spin">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>

          </div>}
      </ul>

    </div>
  )
}
