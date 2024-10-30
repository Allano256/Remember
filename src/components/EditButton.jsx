import React from 'react';

function EditButton({ onClick }) {
    return (
        <button  class='btn' onClick={onClick} type="edit">
            ✎ Edit
        </button>
    );
}

export default EditButton;
   
