// ItemTable1.tsx
import React, { useEffect, useState } from 'react';
import './ItemTable1.css';

interface ItemTableProps {
    itemId: string;
}

const ItemTable1: React.FC<ItemTableProps> = ({ itemId }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedEffectiveDate, setSelectedEffectiveDate] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [selectAddressChangeEffect, setSelectAddressChangeEffect] = useState('');
    const [addressChangeEffect, setAddressChangeEffect] = useState('');
    const [selectAddressChangeDriverEffect, setSelectAddressChangeDriverEffect] = useState('');
    const [addressChangeDriverEffect, setAddressChangeDriverEffect] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [selectedOption, setSelectedOption] = useState('A');
    const [message, setMessage] = useState('');

    const localStorageKey = `itemTable1-${itemId}`;

    useEffect(() => {
        const data = localStorage.getItem(localStorageKey);
        if (data) {
            const savedData = JSON.parse(data);
            setDisplayName(savedData.displayName || '');
            setSelectedDate(savedData.selectedDate || '');
            setSelectedTime(savedData.selectedTime || '');
            setSelectedEffectiveDate(savedData.selectedEffectiveDate || '');
            setNewAddress(savedData.newAddress || '');
            setSelectAddressChangeEffect(savedData.selectAddressChangeEffect || '');
            setAddressChangeEffect(savedData.addressChangeEffect || '');
            setSelectAddressChangeDriverEffect(savedData.selectAddressChangeDriverEffect || '');
            setAddressChangeDriverEffect(savedData.addressChangeDriverEffect || '');
            setAdditionalNotes(savedData.additionalNotes || '');
            setSelectedOption(savedData.selectedOption || 'ABC');
        }
    }, [itemId]);  // Load data when itemId changes

    const saveData = () => {
        const dataToSave = {
            displayName,
            selectedDate,
            selectedTime,
            selectedEffectiveDate,
            newAddress,
            selectAddressChangeEffect,
            addressChangeEffect,
            selectAddressChangeDriverEffect,
            addressChangeDriverEffect,
            additionalNotes,
            selectedOption
        };
        localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
        console.log("Data saved:", dataToSave); // Optional: for debugging
    };

    const handleTodayDate = () => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
        setSelectedTime(currentTime);
    };

    // const setAddressChangeEffect = (value: string) => {
    //     console.log('Address change effect:', value);
    //     if (value == 'yes') {
    //         // show the following fields

    //     } else {
    //         // hide the following fields
    //     }
    // };

    const handleGenerate = async () => {
        // setMessage(`${displayName} ${lastName} selects ${selectedOption} at the date of ${selectedDate}`);
        const name = `Name: ${displayName}`;
        // const datetime = `Date: ${selectedDate}` + ', ' + new Date(selectedDate + 'T' + selectedTime).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const time = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const datetime = `Date: ${date}, ${time}`;
        const effectiveDate = `Effective date of address change: ${selectedEffectiveDate}`
        const strNewAddress = `New Address: ${newAddress}`;
        
        let addressChangeEffectStr = `Will this address change affect the usage and distance driven of any of the vehicles on the policy: ${selectAddressChangeEffect || 'no'}`;
        if (selectAddressChangeEffect === 'yes') {
            addressChangeEffectStr = `Change to use and distance driven: ${addressChangeEffect}`;            
        }
        
        let addressChangeDriverEffectStr = `Will the address change affect driver assignment on any of the vehicles: ${selectAddressChangeDriverEffect || 'no'}`;
        if (selectAddressChangeDriverEffect === 'yes') {
            addressChangeDriverEffectStr = `Please note any changes to driver assignment for all vehicles listed on the policy: ${addressChangeDriverEffect}`;
        }
        
        const strAdditionalNotes = `Additional Notes: ${additionalNotes}`;
        const message = `${name}\n${datetime}\n${effectiveDate}\n${strNewAddress}\n${addressChangeEffectStr}\n${addressChangeDriverEffectStr}\n${strAdditionalNotes}`;
        setMessage(message);
        saveData();

        // Copy the message to the clipboard
        try {
            await navigator.clipboard.writeText(message);
            console.log('Message copied to clipboard');
        } catch (err) {
            console.error('Failed to copy message: ', err);
        }
    };

    const handleClear = () => {
        console.log("Local storage cleared for key:", localStorageKey); // Optional: for debugging
        localStorage.removeItem(localStorageKey);
        setMessage('');
        setDisplayName('');
        setSelectedDate('');
        setSelectedTime('');
        setSelectedEffectiveDate('');
        setSelectAddressChangeEffect('');
        setAddressChangeEffect('');
        setSelectAddressChangeDriverEffect('');
        setAddressChangeDriverEffect('');
        setNewAddress('');
        setAdditionalNotes('');
    };

    return (
        <div className="containerItemTable1">
            <label className="label">Who called/emailed:</label>
            <div className="row">
                <input
                    className="input input-short"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </div>
            {/* <label className="label">Date:</label>
            <div className="row">
                <input
                    className="input"
                    type="date"
                    value={selectedDate.split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value + 'T' + selectedTime)}
                />
                <input
                    className="input button-margin"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                />
                <button className="button button-margin" onClick={handleTodayDate}>Today & Now</button>
            </div> */}
            <label className="label">Effective date of address change:</label>
            <div className="row">
                <input
                    className="input"
                    type="date"
                    value={selectedEffectiveDate.split('T')[0]}
                    onChange={(e) => setSelectedEffectiveDate(e.target.value)}
                />
            </div>
            <label className="">New Address:</label>
            <div className="row label">
                <input
                    className='input'
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                />
            </div>

            <label className="row">Will this address change affect the usage and distance driven of any of the vehicles on the policy?</label>
            <div className="">
                <div>
                    <input
                        type="radio"
                        id="yes"
                        name="selectAddressChangeEffect"
                        value="yes"
                        onChange={(e) => setSelectAddressChangeEffect(e.target.value)}
                    />
                    <label htmlFor="yes">Yes</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="no"
                        name="selectAddressChangeEffect"
                        value="no"
                        onChange={(e) => setSelectAddressChangeEffect(e.target.value)}
                        defaultChecked
                    />
                    <label htmlFor="no">No</label>
                </div>
                {selectAddressChangeEffect === 'yes' && (
                    <div id="addressChangeEffectDiv">
                        <label className="">Note any change in use (i.e. pleasure, commute, business) and distance driven for all vehicles on the policy:</label>
                        <div className="row label">
                            <textarea
                                className='input'
                                value={addressChangeEffect}
                                onChange={(e) => setAddressChangeEffect(e.target.value)}
                                style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <label className="row">Will the address change affect driver assignment on any of the vehicles?</label>
            <div className="">
                <div>
                    <input
                        type="radio"
                        id="yesDriver"
                        name="selectAddressChangeDriverEffect"
                        value="yes"
                        onChange={(e) => setSelectAddressChangeDriverEffect(e.target.value)}
                    />
                    <label htmlFor="yesDriver">Yes</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="noDriver"
                        name="selectAddressChangeDriverEffect"
                        value="no"
                        onChange={(e) => setSelectAddressChangeDriverEffect(e.target.value)}
                        defaultChecked
                    />
                    <label htmlFor="noDriver">No</label>
                </div>
                {selectAddressChangeDriverEffect === 'yes' && (
                    <div id="addressChangeDriverEffectDiv">
                        <label className="">Please note any changes to driver assignment for all vehicles listed on the policy:</label>
                        <div className="row label">
                            <textarea
                                className='input'
                                value={addressChangeDriverEffect}
                                onChange={(e) => setAddressChangeDriverEffect(e.target.value)}
                                style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <label className="">Additional Notes:</label>
            <div className="row label">
                <textarea
                    className='input'
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                />
            </div>
            {/* <div>
                <label className="label">Select Option:</label>
                <select className="select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div> */}
            {/* <div>
                <button className="button" onClick={saveData}>Save</button>
            </div> */}
            <div>
                <button className="button" onClick={handleGenerate}>Generate & Copy</button>
            </div>
            {/* {message && <p className="message">{message}</p>} */}
            {message && <pre className="message">{message}</pre>}
            
            <div>
                <button className="button" onClick={handleClear}>Clear</button>
            </div>
        </div>
    );
};

export default ItemTable1;
