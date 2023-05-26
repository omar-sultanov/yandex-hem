import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useControlDeviceMutation, useControlScenariMutation, useLazyGetOneDeviceQuery } from '@/redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectInfoData, setActionStatus, setInfoPower } from '@/redux/slices/infoSlice';
import { PowerInfo } from '@/types/PowerInfo';


export default function AddScenari() {
    const [startTime, setStartTime] = React.useState<Dayjs | null>(dayjs());
    const [finishTime, setFinishTime] = React.useState<Dayjs | null>(dayjs());
    const dispatch = useDispatch();
    const [controlScenari, { isSuccess }] = useControlScenariMutation();
    const [controlDevice, { isError, error }] = useControlDeviceMutation()
    const [getOneDevice, { data }] = useLazyGetOneDeviceQuery();
    const onChangeInfo = (data: PowerInfo[]) => dispatch(setInfoPower(data));
    const navigate = useNavigate();
    const id = window.location.pathname.slice(9)
    const now = dayjs();
    const { statusAction } = useSelector(selectInfoData);
    const onChangeActionStatus = (status: boolean) => dispatch(setActionStatus(status));

    React.useEffect(() => {
        getOneDevice(id)
    }, [])
    const onClickScenari = async () => {
        setTimeLoad()
        const response = await controlScenari("c28a88e2-e2cc-4cd9-a9df-b7e3f786f9e7").unwrap()
        return response
    }

    const setTimeLoad = () => {
        const newCountUsePower = {
            time: new Date().toLocaleString('ru-Ru'),
            power: data?.properties[1].state.value
        }
        onChangeInfo([newCountUsePower]);
    }
    const controlTime = () => {
        const startdiffInMilliSeconds = startTime?.diff(now, 's'); // Difference in milliseconds
        const finishdiffInMilliSeconds = finishTime?.diff(now, 's'); // Difference in milliseconds

        if (startTime?.isBefore(now)) {
            console.log("The future date is before the current date.");
            alert("Check time ...")
            return false
        }
        if (finishTime?.isBefore(now)) {
            console.log("The future date is before the current date.");
            alert("Check time ...")
            return false
        }
        if (finishTime?.isBefore(startTime)) {
            console.log("The future date is before the current date.");
            alert("Check time ...")
            return false
        }

        if (typeof (startdiffInMilliSeconds) == "number") {
            setTimeout(() => {
                console.log("START");
                // onChangeActionStatus(!statusAction)
                console.log(statusAction);
                controlTimeDevice(true)
                setTimeLoad()
            }, startdiffInMilliSeconds);
        }

        if (typeof (finishdiffInMilliSeconds) == "number") {
            setTimeout(() => {
                console.log("FINISH ");
                // onChangeActionStatus(!statusAction)
                console.log(statusAction);

                controlTimeDevice(false)
                setTimeLoad()
            }, finishdiffInMilliSeconds);
        }
    }
    const controlTimeDevice = async (status: boolean) => {
        onChangeActionStatus(!statusAction)
        const response = await controlDevice({
            devices: [
                {
                    id: id,
                    actions: [
                        {
                            type: "devices.capabilities.on_off",
                            state: {
                                instance: "on",
                                value: status
                            }
                        }
                    ]
                }
            ]
        }).unwrap()
        return response
    }
    const onSubmitScenari = async () => {
        controlTime()
    }
    return (
        <div className='Scenari'>
            <h3>Создавайте новые сценарии на сегодняшний день</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker', 'TimePicker']}>
                    <TimePicker
                        label="Начиная с"
                        value={startTime}
                        onChange={(newValue) => setStartTime(newValue)}
                    />
                    <TimePicker
                        label="Заканчивая"
                        value={finishTime}
                        onChange={(newValue) => setFinishTime(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <div className='scenari-btns'>
                <a href="#" onClick={onClickScenari}><FontAwesomeIcon icon={faPlay} /> Запуск yandex api сценария</a>
                <button className="scenari-button" onClick={onSubmitScenari}><FontAwesomeIcon className='Icon' icon={faPlus} />Создать сценарий</button>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faBackwardStep} /> Вернуться назад</button>
        </div>
    );
}
