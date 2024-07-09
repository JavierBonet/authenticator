import { useState, useContext, useEffect } from 'react';
import { ProgrammingLanguage } from '../../../../common/interfaces';
import EntitiesApi from '../../api/entitiesApi';
import TokenContext from '../../contexts/TokenContext';
import { CircularProgress } from '@mui/material';
import ProgrammingLanguagesTable from './ProgrammingLanguages/ProgrammingLanguagesTable';
import styles from './ProgrammingLanguages.module.scss';
import { toast } from 'react-toastify';

const ProgrammingLanguages = () => {
  const [programmingLanguages, setProgrammingLanguages] = useState<
    ProgrammingLanguage[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { setToken, tokenRef } = useContext(TokenContext);
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

  return (
    <div className={styles['programming-languages-table']}>
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <ProgrammingLanguagesTable
          programmingLanguages={programmingLanguages}
        />
      )}
    </div>
  );
};

export default ProgrammingLanguages;
