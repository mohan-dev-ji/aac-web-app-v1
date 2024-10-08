
"use client"; 

import React, { useEffect, useState } from 'react';
import ListItemCard from '../components/ListItemCard';
import { useRouter } from 'next/navigation'; 

function Lists() {
  const [savedLists, setSavedLists] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log('Router is available:', router);
  }, [router]);

  useEffect(() => {
    fetch('/api/loadPecsLists')
      .then((response) => response.json())
      .then((data) => {
        setSavedLists(data);
      })
      .catch((error) => console.error('Error loading PECs Lists:', error));
  }, []);

  console.log(savedLists);
  
  const handlePlayList = (pecs) => {
    // Serialize the PECs and encode them
    const pecsString = encodeURIComponent(JSON.stringify(pecs));

    // Navigate to playback page with query parameters
    router.push(`/playback?pecs=${pecsString}`);
  };

  
  // const handlePlayList = (pecs) => {
  //   let currentIndex = 0;
  //   const playNextAudio = () => {
  //     if (currentIndex < pecs.length) {
  //       const audio = new Audio(`/audio/${pecs[currentIndex].replace('.svg', '.mp3')}`);
  //       audio.play();
  //       audio.onended = () => {
  //         currentIndex += 1;
  //         playNextAudio();
  //       };
  //     }
  //   };
  //   playNextAudio();
  // };

  const handleDeleteList = async (id) => {
    const updatedLists = savedLists.filter(list => list.id !== id);

    await fetch('/api/savePecsLists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLists),
    });

    setSavedLists(updatedLists);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Saved Lists</h1>
      {savedLists.map((list) => (
        <ListItemCard 
          key={list.id}
          list={list}
          onPlay={handlePlayList}
          onDelete={handleDeleteList}
        />
        ))}
        </div>
    );
    }

export default Lists;
