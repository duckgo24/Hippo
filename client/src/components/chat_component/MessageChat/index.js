import { useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";
import Paragraph from "../../Paragraph";
import RenderWithCondition from "../../RenderWithCondition";



function MessageChat({ sender, message }) {
    const { my_account } = useSelector(state => state.account);
    

    return (
        <div className ={`flex ${my_account?.acc_id === sender?.acc_id ? "justify-end" : "justify-start"} mt-1 gap-3 relative`}>
            <RenderWithCondition condition={my_account?.acc_id !== sender?.acc_id}>
                <Avatar src={sender?.avatar} alt={sender?.avatar} />
            </RenderWithCondition>
            <RenderWithCondition condition={message?.image}>
                <img src={message?.image} alt={message?.image} style={{
                    height: "200px",
                    width: "200px",
                    objectFit: "cover",
                }}/>
            </RenderWithCondition>
            <RenderWithCondition condition={message?.content} >
                <p className={`p-2 rounded-lg ${my_account?.acc_id === sender?.acc_id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                    {message?.content}
                </p>
            </RenderWithCondition>
        </div>
    );
}

export default MessageChat;