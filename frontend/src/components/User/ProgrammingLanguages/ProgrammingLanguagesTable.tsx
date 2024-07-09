import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { ProgrammingLanguage } from '../../../../../common/interfaces';

const purpleColor = '#3f51b5';
const categoryColor = '#f50057';
const tableBackgroundColor = '#f5f5f5';
const differentiatorRowColor = '#e0e0e0';
const tablePadding = 20;
const headerCellBorderRadius = 15;
const tableBorderRadius = headerCellBorderRadius + tablePadding;

const styles = {
  tableContainer: {
    margin: '20px',
    padding: `${tablePadding}px`,
    backgroundColor: `${tableBackgroundColor}8f`,
    borderRadius: `${tableBorderRadius}px`,
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: `${differentiatorRowColor}af`,
    },
  },
  tableCellHeader: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: purpleColor,
    textAlign: 'center',
  },
  tableCell: {
    padding: '10px',
    borderRadius: '10px',
  },
  productName: {
    color: purpleColor,
    fontWeight: 'bold',
  },
  productCategory: {
    color: categoryColor,
  },
};

const ProgrammingLanguagesTable = ({
  programmingLanguages,
}: {
  programmingLanguages: ProgrammingLanguage[];
}) => {
  return (
    <TableContainer component={Paper} sx={styles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                ...styles.tableCellHeader,
                borderTopLeftRadius: `${headerCellBorderRadius}px`,
              }}
            >
              Name
            </TableCell>
            <TableCell sx={styles.tableCellHeader}>Creator</TableCell>
            <TableCell sx={styles.tableCellHeader}>First appearance</TableCell>
            <TableCell sx={styles.tableCellHeader}>Paradigm</TableCell>
            <TableCell sx={styles.tableCellHeader}>Typing discipline</TableCell>
            <TableCell
              sx={{
                ...styles.tableCellHeader,
                borderTopRightRadius: `${headerCellBorderRadius}px`,
              }}
            >
              Usage
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {programmingLanguages.map((programmingLanguage, index) => (
            <TableRow key={index} sx={styles.tableRow}>
              <TableCell sx={styles.tableCell}>
                {programmingLanguage.name}
              </TableCell>
              <TableCell sx={styles.tableCell}>
                <strong>{programmingLanguage.developer}</strong>
              </TableCell>
              <TableCell sx={styles.tableCell}>
                <Typography sx={styles.productCategory}>
                  {programmingLanguage.first_appeared}
                </Typography>
              </TableCell>
              <TableCell sx={styles.tableCell}>
                <ul>
                  {programmingLanguage.paradigm.map((paradigm, i) => (
                    <li key={i}>{paradigm}</li>
                  ))}
                </ul>
              </TableCell>

              <TableCell sx={styles.tableCell}>
                {programmingLanguage.typing_discipline}
              </TableCell>
              <TableCell sx={styles.tableCell}>
                <ul>
                  {programmingLanguage.usage.map((usage, i) => (
                    <li key={i}>{usage}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProgrammingLanguagesTable;
