import React from 'react';
const List = (props) => {
    const { wordList } = props;
    if (!wordList || wordList.length === 0) return <p>No results, sorry</p>;
    return (
        <ul>
            <h2 className='list-head'>Words that rhyme with car</h2>
            {wordList.map((words) => {
                return (
                    <li key={words.word} className='list'>
                    </li>
                );
            })}
            console.log(wordList)
        </ul>
    );
};
export default List;
