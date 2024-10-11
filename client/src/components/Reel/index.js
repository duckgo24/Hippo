import { Box, Popper } from "@mui/material";
import { AudioIcon, CloseIcon, HealIcon, MessageIcon, MoreIcon, ShareIcon } from "../SgvIcon";


import styles from './Reel.module.scss';
import classNames from "classnames/bind";
import CardUser from "../CardUser";
import Button from "../Button";
import Paragraph from "../Paragraph";
import { useEffect, useRef } from "react";
import CommentList from "../comment_component/CommentList";
import RenderWithCondition from "../RenderWithCondition";
const cx = classNames.bind(styles);


function Reel({ reel, onReelInView, onClickReel }) {
    const reelRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onReelInView(reelRef);
                }
            },
            {
                root: null,
                threshold: 0.5,
            }
        );

        if (reelRef.current) {
            observer.observe(reelRef.current);
        }

        return () => {
            if (reelRef.current) {
                observer.unobserve(reelRef.current);
            }
        };
    }, [onReelInView]);



    return (
        <Box
            display="flex"
            alignItems="center"
            gap="10px"
            height="90vh"
        >
            <Box
                boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                padding="10px"
                borderRadius="10px"
            >
                <video
                    style={{
                        marginTop: "40px"
                    }}
                    src={reel?.video}
                    controls
                    width="450px" height="450px"
                    ref={reelRef}
                    autoPlay
                    muted
                />
                <Box
                    display="flex"
                    alignItems="center"
                    gap="10px"
                >
                    <CardUser nickname={reel?.accounts?.nickname} avatar={reel?.accounts?.avatar} tick={reel?.accounts?.tick} />
                    <Button small primary>Theo dõi</Button>
                </Box>
                <Paragraph size="14px">{reel?.title}</Paragraph>
                <Box
                    position="relative"
                    bgcolor="rgba(0, 0, 0, 0.1)"
                    borderRadius="10px"
                    overflow="hidden"
                    padding="7px 8px"
                    height="40px"
                    sx={{
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.15)",
                            cursor: "pointer"
                        }
                    }}
                >
                    <Paragraph className={cx('audio')} >  <AudioIcon size={14} /> {reel?.accounts?.nickname} • Âm thanh gốc</Paragraph>
                </Box>

            </Box>
            <Box
                display="flex"
                flexDirection="column"
                gap="10px"
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Button>
                        <HealIcon color="#000" />
                    </Button>
                    <Paragraph color="#000" size="14px">{reel?.num_likes} </Paragraph>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Button>
                        <MessageIcon color="#000" />
                    </Button>
                    <Paragraph color="#000" size="14px">{reel?.num_comments} </Paragraph>

                    <Popper
                        placement="bottom-start"
                    >
                        <Box sx={{
                            border: 1,
                            p: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 4,
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            width: 450,
                            maxWidth: '100%',
                            minHeight: '100px',
                            marginLeft: 'auto',
                        }}>
                            <Box
                                position="relative"
                                height={40}
                                display="flex"
                                alignItems="center"
                                gap="10px"
                                padding=" 0 10px"
                            >
                                <button>
                                    <CloseIcon size={16} />
                                </button>
                                <Paragraph color="#000" bold="600" style={{
                                    fontSize: '18px',
                                    lineHeight: '20px',
                                    textAlign: 'center',
                                    flex: 1
                                }} >
                                    Bình luận
                                </Paragraph>
                            </Box>
                            <RenderWithCondition >
                                <CommentList />
                            </RenderWithCondition>
                        </Box>
                    </Popper>
                </Box>
                <Button>
                    <ShareIcon />
                </Button>
                <Button>
                    <MoreIcon />
                </Button>
            </Box>
        </Box>
    );
}

export default Reel;