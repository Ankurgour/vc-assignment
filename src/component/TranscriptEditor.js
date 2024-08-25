
import React, { useState, useEffect } from 'react';

function TranscriptEditor({ initialTranscript }) {
    const [transcript, setTranscript] = useState(initialTranscript);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedWord, setEditedWord] = useState('');

    const handlePlay = () => {
        setIsPlaying(true);
        setCurrentWordIndex(0);
    };

    useEffect(() => {
        if (isPlaying && currentWordIndex < transcript.length) {
            const currentWord = transcript[currentWordIndex];
            const timer = setTimeout(() => {
                setCurrentWordIndex(currentWordIndex + 1);
            }, currentWord.duration);

            return () => clearTimeout(timer);
        }
    }, [isPlaying, currentWordIndex, transcript]);

    const handleWordClick = (index) => {
        setEditingIndex(index);
        setEditedWord(transcript[index].word);
    };

    const handleWordChange = (e) => {
        setEditedWord(e.target.value);
    };

    const handleWordUpdate = () => {
        const updatedTranscript = [...transcript];
        updatedTranscript[editingIndex].word = editedWord;
        setTranscript(updatedTranscript);
        setEditingIndex(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleWordUpdate();
        }
    };

    return (
        <div>
            <div>
                {transcript.map((word, index) => (
                    <span
                        key={index}
                        onClick={() => handleWordClick(index)}
                        className={`cursor-pointer ${index === currentWordIndex ? 'bg-yellow-300' : ''}`}
                    >
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={editedWord}
                                onChange={handleWordChange}
                                onBlur={handleWordUpdate}
                                onKeyDown={handleKeyPress}
                                className="bg-transparent border-b  border-gray-500 focus:outline-none"
                            />
                        ) : (
                            word.word
                        )}{' '}
                    </span>
                ))}
            </div>
            <button onClick={handlePlay} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Play
            </button>
        </div>
    );
}

export default TranscriptEditor;
