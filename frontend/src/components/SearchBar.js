import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Self coded

// Reused code from Video tutorials - https://github.com/basir/amazona , https://www.udemy.com/course/build-ecommerce-website-like-amazon-react-node-mongodb , https://www.youtube.com/watch?v=TRCDsB9i3bI&list=PLSV-EvELRCzBvF5d0IQGnD9m5dnvKrJ8K&index=29
export default function SearchBar(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  //
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          placeholder="Search Peak Perfomance Website..." //reuesed, edited
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit">
           <FaSearch />  {/* self coded */}
        </button>
      </div>
    </form>
  );
}
