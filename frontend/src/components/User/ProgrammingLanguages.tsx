import { useState, useContext, useEffect } from 'react';
import { JWT, ProgrammingLanguage } from '../../../../common/interfaces';
import EntitiesApi from '../../api/entitiesApi';
import TokenContext from '../../contexts/TokenContext';
import { CircularProgress } from '@mui/material';
import ProgrammingLanguagesTable from './ProgrammingLanguages/ProgrammingLanguagesTable';
import styles from './ProgrammingLanguages.module.scss';
import { toast } from 'react-toastify';
// import jwt from 'jsonwebtoken';

const ProgrammingLanguages = () => {
  const [programmingLanguages, setProgrammingLanguages] = useState<
    ProgrammingLanguage[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');
  const { token, setToken, tokenRef } = useContext(TokenContext);
  const entitiesApi = new EntitiesApi(setToken, () => tokenRef.current);

  useEffect(() => {
    setLoading(true);
    entitiesApi
      .getProgrammingLanguages()
      .then((response) => {
        setProgrammingLanguages(response.programmingLanguages ?? []);
      })
      .catch(() => toast.warn('Could not load programming languages'))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    function parseJwt(token: string) {
      if (!token) {
        return;
      }
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
    const parsedToken = parseJwt(token) as JWT.Payload;
    if (parsedToken) {
      setRole(parsedToken.role);
    }
  }, [token]);

  return (
    <div className={styles['programming-languages-table']}>
      {loading ? (
        <CircularProgress color="inherit" />
      ) : role === 'developer' ? (
        <ProgrammingLanguagesTable
          programmingLanguages={programmingLanguages}
        />
      ) : (
        <h1 className={styles['forbidden-message']}>
          You must be a developer to see this section
        </h1>
      )}
    </div>
  );
};

export default ProgrammingLanguages;
