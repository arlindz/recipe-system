import { useRef, useState } from 'react';

export default function AddPerson() {
    const name = useRef();
    const surname = useRef();
    const bank = useRef();
    const userToDelete = useRef();
    const personToGet = useRef();
    const newName = useRef(), newSurname = useRef(), newBankId = useRef()
    const [person, setPerson] = useState({});
    const [editingMode, setEditingMode] = useState(false);
    const [currentPersonId, setCurrentUserId] = useState('');
    async function editPerson() {
        try {
            const response = await fetch(`http://localhost:5000/api/person/${currentPersonId}`, {
                method: "PUT",
                headers: {
                    'r-a-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newName.current.value,
                    surname: newSurname.current.value,
                    bank: newBankId.current.value
                })
            });
            if (response.status !== 200 && response.status !== 304) return;
            const json = await response.json();
            setPerson(json.response.length === 0 ? {} : json.response[0]);
            setEditingMode(false);
        } catch (error) {
            console.log(error);
        }
    }
    async function getPerson() {
        try {
            const response = await fetch(`http://localhost:5000/api/person/${personToGet.current.value}`, {
                method: "GET",
                headers: {
                    'r-a-token': localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            console.log(json.response);
            setPerson(json.response.length === 0 ? {} : json.response[0]);
            setCurrentUserId(personToGet.current.value);
        } catch (error) {
            console.log(error);
        }
    }
    async function addPerson() {
        try {
            const response = await fetch(`http://localhost:5000/api/person`, {
                method: "POST",
                headers: {
                    'r-a-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.current.value,
                    surname: surname.current.value,
                    bank: bank.current.value
                })
            });
        } catch (error) {
            console.log(error);
        }
    }
    async function deletePerson() {
        try {
            const response = await fetch(`http://localhost:5000/api/person/${userToDelete.current.value}`, {
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
            <div className='flex w-full justify-evenly items-center'>
                <div className='w-80 h-96 flex flex-col justify-evenly items-center border-2 border-black ml-40'>
                    <h1>Emri</h1>
                    <input className='border-2 border-black' ref={name} type="text" placeholder="emri" />
                    <h1>Mbiemri</h1>
                    <input className='border-2 border-black' ref={surname} type="text" placeholder="mbiemri" />
                    <h1>Bank Id</h1>
                    <input className='border-2 border-black' ref={bank} type="number" placeholder="bank id" />
                    <button className='border-2 border-black' onClick={addPerson}>ADD PERSON</button>
                </div>
                <div className='w-64 h-40 border-2 border-black  flex flex-col items-center justify-center'>
                    <input className='border-2 border-black' ref={userToDelete} type='number' placeholder='id of the user you want to delete' /><button onClick={deletePerson}>DELETE</button>
                </div>
                <div className='w-64 h-96 border-2 border-black flex flex-col items-center justify-center'>
                    <input className='border-2 border-black' type='number' placeholder='id of the person you want to get' ref={personToGet} /><button onClick={getPerson}>GET PERSON</button>
                    {editingMode === false ?
                        <div className='h-40 w-40 flex justify-center flex-col items-center border-2 border-black'>
                            <h2>Emri: {person.Emri57292}</h2>
                            <h2>Mbiemri: {person.Mbiemri57292}</h2>
                            <h2>ID: {person.ID57292}</h2>
                            <h2>EmriBankes: {person.EmriBankes}</h2>
                        </div> : <div className='h-40 w-80 flex justify-center flex-col items-center border-2 border-black'>
                            <input ref={newName} type='text' placeholder='new name' />
                            <input ref={newSurname} type='text' placeholder='new surname' />
                            <input ref={newBankId} type='number' placeholder='new bankId' />
                            <button onClick={editPerson}>CONFIRM EDIT</button>
                        </div>}{<button onClick={() => { setEditingMode(prev => !prev) }}>EDIT</button>}
                </div>

            </div>
        </div>
    );
}