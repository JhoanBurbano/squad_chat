import React, { useContext, useState, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';

import { useRoom } from '../../../context/Room';
import { useUser } from '../../../context/User';
import api from '../../../services/api';
import { createOrJoinRoom, getRoomData } from '../../../services/socket';

import { Input } from '../../../components/Input';
import { PrimaryButton } from '../../../components/Buttons';

import { Container, Header, RoomInfo } from './styles';
import { IErrorResponse } from '../../../interfaces';

interface ICreateRoomProps {
  setStep(step: number): void;
}

const CreateRoom: React.FC<ICreateRoomProps> = ({ setStep }) => {
  const [roomId, setRoomId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useContext(ThemeContext);
  const { setRoom } = useRoom();
  const { setUser, user } = useUser();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await api.post('/room', {
        roomName,
      });

      setRoomId(response.data.roomId);

      createOrJoinRoom({ roomId: response.data.roomId, userName: user });

      getRoomData(room => {
        setRoom(room);
      });
    } catch (err) {
      console.error((err as IErrorResponse).response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <FiArrowLeft color={colors.textBase} size={24} onClick={() => setStep(0)} />

        <h3>Crear SQUAD</h3>
      </Header>

      <form onSubmit={handleSubmit}>
        <Input id="nickname" label="Username" value={user} onChange={event => setUser(event.target.value)} />

        <Input id="room-name" label="Nombre de tu SQUAD" value={roomName} onChange={event => setRoomName(event.target.value)} />

        {roomId.length > 0 &&
          <RoomInfo>
            <p>ID de tu SQUAD: <strong>{roomId}</strong></p>

            <NavLink to={`/room/${roomId}`}>Click para hacer parte de tu Squad</NavLink>
          </RoomInfo>
        }
        
        <PrimaryButton type="submit" loading={loading}>Crear Squad</PrimaryButton>
      </form>
    </Container>
  );
}

export default CreateRoom;