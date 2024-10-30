import React from 'react';

function EditButton({ onClick }) {
    return (
        <button  style="
        padding: 1rem;
        font-size: 2rem !important;!i;!;
        background-color: #00BCD4;
        border-radius: 10px;
    " onClick={onClick} type="edit">
            ✎ Edit
        </button>
    );
}

export default EditButton;
   
