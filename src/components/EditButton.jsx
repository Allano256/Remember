import React from 'react';

function EditButton({ onClick }) {
    return (
        <button onClick={onClick} type="button">
            ✎ Edit
        </button>
    );
}

export default EditButton;
   

//     const handleClick =(e) => {
//         e.preventDefault();
//         if (isEdit){
//             onEdit();
//         } else {
//             navigate(-1);
//         }
//     }


// return(
//     <Button type={isEdit ? 'edit': 'back'} onClick={handleClick}>
//         {isEdit ? '✎ Edit' : '← Back' }
//        </Button>
// );

