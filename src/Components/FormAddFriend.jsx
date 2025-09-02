import { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ onAddFriend }) {
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
      friendImage && friendImage.startsWith("https://")
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