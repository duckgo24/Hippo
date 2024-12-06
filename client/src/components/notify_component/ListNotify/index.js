import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@mui/material";

import Notify from "../Notify";
import RenderWithCondition from "../../RenderWithCondition";
import { MdOutlineNotificationsActive } from "react-icons/md";
import Loading from "../../Loading";
import { fetchGetAllNotify } from "../../../redux/slice/notify.slice";


export default function ListNotify({ open }) {
    const { my_account } = useSelector(state => state.account);
    const { is_loading_notify } = useSelector(state => state.notify);
    const { notifies } = useSelector(state => state.notify);
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            dispatch(fetchGetAllNotify({ acc_id: my_account.acc_id }));
        }
    }, [open]);


    return (
        <div className="flex flex-col overflow-y-auto" style={{
            height: '70vh'
        }}>
            <div className="flex flex-row items-center gap-2 font-semibold px-5 py-2">
                <MdOutlineNotificationsActive size={35} />
                <p> Thông báo</p>
            </div>
            <p className="px-5">Gần đây</p>
            <Divider />

            <RenderWithCondition condition={is_loading_notify}>
                <div className="px-5 py-2">
                    <Loading />
                </div>
            </RenderWithCondition>

            <RenderWithCondition condition={notifies.length === 0 && !is_loading_notify}>
                <p className="p-5 text-lg font-bold">Thông báo của bạn trống</p>
            </RenderWithCondition>
            <RenderWithCondition condition={notifies && notifies.length > 0 && !is_loading_notify}>
                <div className="flex flex-col gap-1 mt-3  hoverflow-y-auto">
                    {notifies?.map((notify) => (
                        <Notify notify={notify} key={notify.notify_id} />
                    ))}
                </div>
            </RenderWithCondition>
        </div>
    );
};