import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Gamal",
    image: "https://i.pravatar.cc/48?u=499481",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App(){
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false)
  function handleAddFriend(newFriend){
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false)
  }
  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        { showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} /> }
        <Button onClick={() => setShowAddFriend(prevState => !prevState)}>{showAddFriend ? "Close" : "Add Friend"}</Button>
      </div>
      <FormSplitBill />
    </div>
  )
}

function FriendsList({ friends }){
  return(
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id}/>
      ))}
    </ul>
  )
}

function Friend({ friend }){
  return(
    <ul>
      <li>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance > 0 && (<p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>)}
        {friend.balance < 0 && (<p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>)}
        {friend.balance === 0 && (<p>You and {friend.name} are even</p>)}
        <Button>Select</Button>
      </li>
    </ul>
  )
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>{children}</button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("");

  const fallbackImages = [
    "https://i.pravatar.cc/48?u=499464",
    "https://i.pravatar.cc/48?u=499468",
    "https://i.pravatar.cc/48?u=499469",
    "https://i.pravatar.cc/48?u=66668",
    "https://i.pravatar.cc/48?u=66675",
    "https://i.pravatar.cc/48?u=66682",
    "https://i.pravatar.cc/48?u=66684",
  ];

  function getRandomFallback() {
    const index = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[index];
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!friendName) return;

    const validImage =
      friendImage && friendImage.startsWith("http")
        ? friendImage
        : getRandomFallback();

    const newFriend = {
      id: crypto.randomUUID(),
      name: friendName,
      image: validImage,
      balance: 0,
    };

    onAddFriend(newFriend);
    setFriendName("");
    setFriendImage("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👨🏻‍🤝‍👨🏻 Friend Name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>📷 Image URL</label>
      <input
        type="text"
        value={friendImage}
        onChange={(e) => setFriendImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill(){
  return(
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💸 Bill Value</label>
      <input type="text" />

      <label>🧑 Your Expense</label>
      <input type="text" />

      <label>👨🏻‍🤝‍👨🏻 X expense</label>
      <input type="text" disabled/>

      <label>💰 Who is paying the bill?</label>

      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split A Bill</Button>
    </form>
  )
}