import Button from "./Button";
import { useNavigate } from "react-router-dom";

function EditButton(){

    const navigate = useNavigate();
    return (
        <Button type='edit' onClick={(e)=> {
            e.preventDefault();

        }}> &larr; Edit </Button>
    )


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

