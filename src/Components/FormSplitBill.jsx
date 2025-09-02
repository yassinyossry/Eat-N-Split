import { useState } from "react"
import Button from "./Button"

export default function FormSplitBill({ friend , onSplitBill }){
  const [bill, setBill] = useState("")
  const [paidByUser, setPaidByUser] = useState("")
  const paidByFriend = bill ? bill - paidByUser : ""
  const [whoIsPaying, setWhoIsPaying] = useState("user")

  function handleSubmit(e){
    e.preventDefault()
    if (!bill || !paidByUser) return
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser)
  }

  return(
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>

      <label>💸 Bill Value</label>
      <input type="number" min={0} value={bill} onChange={(e) => setBill(Number(e.target.value))}/>

      <label>🧑 Your Expense</label>
      <input type="number" min={0} value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))}/>

      <label>👨🏻‍🤝‍👨🏻 {friend.name} expense</label>
      <input type="number" disabled value={paidByFriend}/>

      <label>💰 Who is paying the bill?</label>

      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split A Bill</Button>
    </form>
  )
}