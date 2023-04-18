import React, { useContext, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { FiArrowLeft } from 'react-icons/fi';

import { createOrJoinRoom, getRoomData } from '../../../services/socket';
import api from '../../../services/api';

import { useRoom } from '../../../context/Room';
import { useUser } from '../../../context/User';
import { PrimaryButton } from '../../../components/Buttons';
import { Input } from '../../../components/Input';

import { Container, Header } from './styles';
import { IErrorResponse } from '../../../interfaces';

interface IJoinRoomProps {
  setStep(step: number): void;
}

const JoinRoom: React.FC<IJoinRoomProps> = ({ setStep }) => {
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState('');
  const { colors } = useContext(ThemeContext);
  const history = useHistory();
  const { setRoom } = useRoom();
  const { user, setUser } = useUser();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      await api.get(`room/${roomId}`);

      createOrJoinRoom({ roomId, userName: user });

      getRoomData(room => {
        setRoom(room);
      });

      history.push(`/room/${roomId}`);
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

        <h3>Unirte a un SQUAD</h3>
      </Header>

      <form onSubmit={handleSubmit}>
        <Input id="nickname" label="Nombre de tu SQUAD" value={user} onChange={event => setUser(event.target.value)}/>

        <Input id="room-id" label="ID del SQUAD" value={roomId} onChange={event => setRoomId(event.target.value)}/>

        <PrimaryButton type="submit" loading={loading}>Haz parte del SQUAD</PrimaryButton>
      </form>

      
    </Container>
  );
}

export default JoinRoom;