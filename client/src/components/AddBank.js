import { useRef, useState } from 'react';
export default function AddBank() {
    const name = useRef();
    const bankToDelete = useRef();
    const bankToGet = useRef();
    const newName = useRef();
    const [bank, setBank] = useState({});
    const [editMode, setEditingMode] = useState(false);
    async function editBank() {
        try {
            const response = await fetch(`http://localhost:5000/api/bank/${bankToGet.current.value}`, {
                method: "PUT",
                headers: {
                    'r-a-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newName.current.value
                })
            });
            if (response.status !== 200 && response.status !== 200) return;
            const json = await response.json();
            setBank(json.response.length === 0 ? {} : json.response[0]);
        } catch (error) {
            console.log(error);
        }
    }
    async function getBank() {
        try {
            const response = await fetch(`http://localhost:5000/api/bank/${bankToGet.current.value}`, {
                method: "GET",
                headers: {
                    'r-a-token': localStorage.getItem('token'),
                }
            });
            if (response.status !== 200 && response.status !== 304) return;
            const json = await response.json();
            setBank(json.response.length === 0 ? {} : json.response[0]);
        } catch (error) {
            console.log(error);
        }
    }
    async function addBank() {
        try {
            const response = await fetch(`http://localhost:5000/api/bank`, {
                method: "POST",
                headers: {
                    'r-a-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.current.value
                })
            });
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteBank() {
        try {
            const response = await fetch(`http://localhost:5000/api/bank/${bankToDelete.current.value}`, {
                method: "DELETE",
                headers: {
                    'r-a-token': localStorage.getItem('token'),
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className='w-full h-96 flex justify-evenly items-center'>
                <div className='w-80 h-96 flex flex-col justify-evenly items-center border-2 border-black'>
                    <input ref={name} type="text" placeholder="emri" />
                    <button onClick={addBank}>ADD BANK</button>
                </div>
                <div className='w-64 h-40 border-black flex flex-col border-2 justify-center items-center'>
                    <input ref={bankToDelete} type='number' placeholder='id of the user you want to delete' /><button onClick={deleteBank}>DELETE BANK</button>
                </div>
                <div className='flex flex-col justify-evenly items-center border-2 border-black w-80 h-96'>
                    <input type='number' placeholder='id of the person you want to get' ref={bankToGet} /><button onClick={getBank}>GET BANK</button>
                    {editMode === false ?
                        <div className='h-40 w-64 flex justify-center flex-col items-center border-2 border-black'>
                            <h2>Emri: {bank.Emri57292}</h2>
                            <h2>ID: {bank.ID57292}</h2>
                        </div> : <div className='h-40 w-80 flex justify-center flex-col items-center border-2 border-black'>
                            <input ref={newName} type='text' placeholder='new name' />
                            <button onClick={editBank}>CONFIRM EDIT</button>
                        </div>}{<button onClick={() => { setEditingMode(prev => !prev) }}>EDIT</button>}
                </div>
            </div>
        </div>
    );
}