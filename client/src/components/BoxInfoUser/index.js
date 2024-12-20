import { Avatar, Divider, Box, Stepper, Typography, StepLabel, Step, Modal, Radio, InputLabel, Select, FormControl, MenuItem } from '@mui/material';
import { MediaIcon, PlusIcon, SmileFaceIcon } from '../SgvIcon';
import Input from '../Input';
// import Cropper from 'react-easy-crop';
import React, { useEffect, useRef, useState } from 'react';
import Paragraph from '../Paragraph';
import Button from '../Button';
import logoTest from '../../images/test.jpg';
import GetLinkImage from '../../utils/GetLinkImage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateAccount, setUpdateMyAccount } from '../../redux/slice/account.slice';
import useHookMutation from '../../hooks/useHookMutation';
import { userService } from '../../services/UserService';
import RenderWithCondition from '../RenderWithCondition';

const BoxInfoUser = React.forwardRef(({ onChangeSuccess }, ref) => {
      const { my_account, status_account } = useSelector((state) => state.account);
      const [infoUser, setInfoUser] = useState(my_account);
      const [avatar, setAvatar] = useState(my_account.avatar);
      const [avatarPreview, setAvatarPreview] = useState(null);

      const [openModal, setOpenModal] = React.useState(false);
      const [activeStep, setActiveStep] = React.useState(0);
      const [skipped, setSkipped] = React.useState(new Set());
      const [imagePreview, setImagePreview] = React.useState(null);
      const [image, setImage] = React.useState(null);
      // const [crop, setCrop] = useState({ x: 0, y: 0 });
      // const [zoom, setZoom] = useState(1);
      const [identityCard, setIdentityCard] = React.useState('');
      const inputIdentityCardRef = useRef(null);
      const dispatch = useDispatch();

      const inputFileAvatarRef = useRef(null);
      const handleChangeAvatar = () => {
            if (inputFileAvatarRef?.current) {
                  inputFileAvatarRef.current.click();
            }
      };

      const updateUserMutation = useHookMutation(({ acc_id, data }) => {
            return userService.updateInfor(acc_id, data);
      });

      const handleOnChangeInfo = () => {
            updateUserMutation.mutate(
                  { acc_id: my_account.acc_id, data: infoUser },
                  {
                        onSuccess: (data) => {
                              dispatch(setUpdateMyAccount(infoUser));
                              onChangeSuccess(data);
                        },
                  },
            );
      };

      const handleOnChangeInputInfo = (e) => {
            setInfoUser({
                  ...infoUser,
                  [e.target.name]: e.target.value,
            });
            console.log(infoUser);
      };

      const handleOnChangeAvatar = async (e) => {
            setAvatarPreview(URL.createObjectURL(e.target.files[0]));
            setAvatar(null);
            const url = await GetLinkImage(e.target.files[0]);
            if (url) {
                  setAvatarPreview(null);
                  setAvatar(url);
                  setInfoUser({
                        ...infoUser,
                        avatar: url,
                  });
            }
      };

      const handleOnClickImage = () => {
            if (inputIdentityCardRef?.current) {
                  inputIdentityCardRef.current.click();
            }
      };
      const handleOnChangeImage = async (e) => {
            setImagePreview(URL.createObjectURL(e.target.files[0]));

            const urlImage = await GetLinkImage(e.target.files[0]);
            if (urlImage) {
                  setImagePreview(null);
                  setImage(urlImage);
            }
      };

      const handleOnSelectIdentityCard = (e) => {
            setIdentityCard(e.target.value);
      };

      const steps = [
            {
                  name: 'Xác thực là gì ?',
                  children: <img src={logoTest} alt="test" width={550} height={400} />,
            },
            {
                  name: 'Nhập thông tin cá nhân ?',
                  children: (
                        <Box>
                              <Select value={identityCard} onChange={handleOnSelectIdentityCard} style={{ minWidth: '200px' }}>
                                    <MenuItem value={'- Giấy tờ tùy thân'}>- Giấy tờ tùy thân</MenuItem>
                                    <MenuItem value={'- Căn cước công dân'}>- Căn cước công dân</MenuItem>
                              </Select>

                              <Box>
                                    {!imagePreview && !image && (
                                          <Button onClick={handleOnClickImage}>
                                                {' '}
                                                <MediaIcon size={300} />{' '}
                                          </Button>
                                    )}
                                    <input ref={inputIdentityCardRef} type="file" style={{ display: 'none' }} onChange={handleOnChangeImage} />
                                    {imagePreview && (
                                          <img
                                                src={imagePreview}
                                                alt="test"
                                                width="100%"
                                                height={400}
                                                style={{ marginTop: '5px', filter: 'blur(5px)' }}
                                          />
                                    )}
                                    {image && <img src={image} alt="test" width="100%" height={400} style={{ marginTop: '5px' }} />}
                              </Box>
                        </Box>
                  ),
            },
            'Thanh toán',
            'Chờ xác nhận',
      ];

      const isStepSkipped = (step) => {
            return skipped.has(step);
      };

      const handleNext = () => {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                  newSkipped = new Set(newSkipped.values());
                  newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
      };

      const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

      const handleReset = () => {
            setActiveStep(0);
      };

      return (
            <Box ref={ref} width={500} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" bgcolor="#fff" borderRadius={5} padding="30px 25px" tabIndex={-1}>
                  <div className="flex justify-between">
                        <div className="flex-1">
                              <label style={{ padding: '0 20px' }}>Tên người dùng</label>
                              <Input
                                    leftIcon={<SmileFaceIcon size={30} color="#000" />}
                                    value={infoUser?.full_name}
                                    style={{ border: 'none' }}
                                    name="full_name"
                                    onChange={handleOnChangeInputInfo}
                              />
                              <Divider style={{ backgroundColor: '#000', height: '2px' }} />
                        </div>
                        <div className="h-16 w-16 relative ml-5">
                              <RenderWithCondition condition={avatar && !avatarPreview}>
                                    <Avatar
                                          src={avatar}
                                          alt={infoUser?.nickname}
                                          onClick={handleChangeAvatar}
                                          sx={{
                                                position: 'relative',
                                                cursor: 'pointer',
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                ':before': {
                                                      content: '""',
                                                      position: 'absolute',
                                                      top: 0,
                                                      left: 0,
                                                      bottom: 0,
                                                      right: 0,
                                                },
                                                ':hover:before': {
                                                      backgroundColor: 'rgba(0, 0, 0, 0.45)',
                                                },
                                          }}
                                    />
                                    <PlusIcon color="rgba(0, 0, 0, 0.45)" style={{ position: 'absolute', bottom: 0, left: 0 }} />
                              </RenderWithCondition>
                              <RenderWithCondition condition={avatarPreview && !avatar}>
                                    <Avatar
                                          src={avatarPreview}
                                          alt={infoUser?.nickname}
                                          sx={{
                                                position: 'relative',
                                                cursor: 'pointer',
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                filter: 'blur(1px)',
                                          }}
                                    />
                              </RenderWithCondition>
                              <input ref={inputFileAvatarRef} type="file" style={{ display: 'none' }} onChange={handleOnChangeAvatar} />
                        </div>
                  </div>

                  <Box>
                        <label style={{ padding: '0 20px' }}>username</label>
                        <Input
                              leftIcon={<SmileFaceIcon size={30} color="#000" />}
                              value={infoUser?.nickname}
                              style={{ border: 'none' }}
                              name="nickname"
                              onChange={handleOnChangeInputInfo}
                        />
                        <Divider style={{ backgroundColor: '#000', height: '2px' }} />
                  </Box>

                  <Box>
                        <label style={{ padding: '0 20px' }}>Bio</label>
                        <Input
                              leftIcon={<SmileFaceIcon size={30} color="#000" />}
                              value={infoUser?.bio}
                              style={{ border: 'none' }}
                              name="bio"
                              onChange={handleOnChangeInputInfo}
                        />
                        <Divider style={{ backgroundColor: '#000', height: '2px' }} />
                  </Box>

                  <div>
                        <Paragraph bold={700} color="#000" style={{ padding: '0 20px', height: '60px' }}>
                              Vai trò: {my_account.role === 'user' && 'Người dùng'}
                        </Paragraph>
                        <Divider style={{ backgroundColor: '#000', height: '2px' }} />
                  </div>

                  <div className="flex mt-2 gap-2">
                        {!my_account.tick ? (
                              <Button large style={{ padding: '10px 20px', backgroundColor: 'green' }} onClick={() => setOpenModal(true)}>
                                    <Paragraph color="#fff" size={14}>
                                          Xác minh tài khoản
                                    </Paragraph>
                              </Button>
                        ) : (
                              <Button large style={{ padding: '10px 20px', backgroundColor: 'green' }} disabled={true}>
                                    <Paragraph color="#fff" size={14}>
                                          Đã xác minh tài khoản
                                    </Paragraph>
                              </Button>
                        )}

                        <Button large style={{ padding: '10px 20px', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} onClick={handleOnChangeInfo}>
                              <Paragraph color="#fff" size={14}>
                                    Cập nhật
                              </Paragraph>
                        </Button>
                  </div>

                  <Modal open={openModal} onClose={() => setOpenModal(false)}>
                        <Box
                              sx={{
                                    bgcolor: 'white',
                                    maxWidth: 700,
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    padding: 2,
                              }}
                        >
                              <Stepper activeStep={activeStep}>
                                    {steps.map((step, index) => {
                                          const stepProps = {};
                                          const labelProps = {};

                                          if (isStepSkipped(index)) {
                                                stepProps.completed = false;
                                          }

                                          return (
                                                <Step key={step.name || step} {...stepProps}>
                                                      <StepLabel {...labelProps}>{typeof step === 'string' ? step : step.name}</StepLabel>
                                                </Step>
                                          );
                                    })}
                              </Stepper>
                              {activeStep === steps.length ? (
                                    <>
                                          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <Button onClick={handleReset}>Reset</Button>
                                          </Box>
                                    </>
                              ) : (
                                    <>
                                          <Box mt={2}>{steps[activeStep]?.children}</Box>
                                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                                                      <p className="text-base text-black">Back</p>
                                                </Button>
                                                <Box sx={{ flex: '1 1 auto' }} />

                                                <button onClick={handleNext}>
                                                      <p className="text-base text-black">
                                                            {' '}
                                                            {activeStep === steps.length - 1 ? 'Hoàn thành' : 'Next'}
                                                      </p>
                                                </button>
                                          </Box>
                                    </>
                              )}
                        </Box>
                  </Modal>
            </Box>
      );
});

export default BoxInfoUser;
