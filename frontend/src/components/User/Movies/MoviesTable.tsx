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
import { Movie } from '../../../../../common/interfaces';

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

const MoviesTable = ({ movies }: { movies: Movie[] }) => {
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
              Title
            </TableCell>
            <TableCell sx={styles.tableCellHeader}>Director</TableCell>
            <TableCell sx={styles.tableCellHeader}>Summary</TableCell>
            <TableCell sx={styles.tableCellHeader}>Year</TableCell>
            <TableCell sx={styles.tableCellHeader}>Genre</TableCell>
            <TableCell sx={styles.tableCellHeader}>Rating</TableCell>
            <TableCell sx={styles.tableCellHeader}>Cast</TableCell>
            <TableCell
              sx={{
                ...styles.tableCellHeader,
                borderTopRightRadius: `${headerCellBorderRadius}px`,
              }}
            >
              Location
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie, index) => (
            <TableRow key={index} sx={styles.tableRow}>
              <TableCell sx={styles.tableCell}>{movie.title}</TableCell>
              <TableCell sx={styles.tableCell}>
                <strong>{movie.director.name}</strong> (
                {movie.director.birth_year})
                <br />
                Nationality: {movie.director.nationality}
                <br />
                Other movies:
                <ul>
                  {movie.director.previous_works.map((previousWork, i) => (
                    <li key={i}>
                      {previousWork.title} - {previousWork.year}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell sx={styles.tableCell}>{movie.plot_summary}</TableCell>
              <TableCell sx={styles.tableCell}>
                <Typography sx={styles.productCategory}>
                  {movie.year}
                </Typography>
              </TableCell>
              <TableCell sx={styles.tableCell}>
                {movie.genre.join(', ')}
              </TableCell>
              <TableCell sx={styles.tableCell}>{movie.rating}</TableCell>
              <TableCell sx={styles.tableCell}>
                <ul>
                  {movie.cast.map((actor, i) => (
                    <li key={i}>
                      <strong>{actor.name}</strong> - {actor.role} - {actor.age}{' '}
                      - {actor.nationality}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell sx={styles.tableCell}>
                <ul>
                  {movie.locations.map((location, i) => (
                    <li key={i}>
                      {location.name} - {location.type} - {location.description}
                    </li>
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

export default MoviesTable;
