import { useState } from "react";
import Button from "./Components/Button";
import FormAddFriend from "./Components/FormAddFriend";
import FormSplitBill from "./Components/FormSplitBill";
import FriendsList from "./Components/FriendsList";

const initialFriends = [];

export default function App(){
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(newFriend){
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false)
  }

   function handleSelectFriend(friend) {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false)
  }

  function handleSubmitBill(value){
    console.log(value)
    setFriends((friends) => friends.map((friend) => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value}: friend))
    setSelectedFriend(null)
  }

  return(
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} selectedFriend={selectedFriend} onSelectFriend={handleSelectFriend}/>
        { showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} /> }
        <Button onClick={() => setShowAddFriend(prevState => !prevState)}>{showAddFriend ? "Close" : "Add Friend"}</Button>
      </div>
      {selectedFriend && <FormSplitBill friend={selectedFriend} onSplitBill={handleSubmitBill}/>}
    </div>
  )
}