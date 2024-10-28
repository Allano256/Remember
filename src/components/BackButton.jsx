import Button from "./Button";
import { useNavigate } from "react-router-dom";

function ActionButton({isEdit, onEdit}){
    const navigate = useNavigate();

    const handleClick =(e) => {
        e.preventDefault();
        if (isEdit){
            onEdit();
        } else {
            navigate(-1);
        }
    }


return(
    <Button type={isEdit ? 'edit': 'back'} onClick={handleClick}>
        {isEdit ? '✎ Edit' : '← Back' }
       </Button>
);

}

export default ActionButton;

// function BackButton() {
//     const navigate= useNavigate();
//     return (
//         <Button  type='back' onClick={(e)=> 
//             {
//                 e.preventDefault();
//                 navigate(-1);} }> 
//                 &larr; Back</Button>
        
               
//     )
// }

// export default BackButton


