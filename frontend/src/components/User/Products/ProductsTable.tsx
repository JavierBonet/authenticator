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
import { Product } from '../../../../../common/interfaces';

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

const ProductsTable = ({ products }: { products: Product[] }) => {
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
            <TableCell sx={styles.tableCellHeader}>Category</TableCell>
            <TableCell sx={styles.tableCellHeader}>Description</TableCell>
            <TableCell sx={styles.tableCellHeader}>Specifications</TableCell>
            <TableCell sx={styles.tableCellHeader}>Manufacturer</TableCell>
            <TableCell
              sx={{
                ...styles.tableCellHeader,
                borderTopRightRadius: `${headerCellBorderRadius}px`,
              }}
            >
              Usage Tips
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index} sx={styles.tableRow}>
              <TableCell sx={styles.tableCell}>
                <Typography sx={styles.productName}>{product.name}</Typography>
              </TableCell>
              <TableCell sx={styles.tableCell}>
                <Typography sx={styles.productCategory}>
                  {product.category}
                </Typography>
              </TableCell>
              <TableCell sx={styles.tableCell}>{product.description}</TableCell>
              <TableCell sx={styles.tableCell}>
                Weight: {product.specs.weight}
                <br />
                Length: {product.specs.length}
                <br />
                Material: {product.specs.material}
              </TableCell>
              <TableCell sx={styles.tableCell}>
                Name: {product.manufacturer.name}
                <br />
                Country: {product.manufacturer.country}
                <br />
                Founded: {product.manufacturer.founded_year}
                <br />
                Products:
                <ul>
                  {product.manufacturer.products.map((product, i) => (
                    <li key={i}>
                      {product.name} - {product.type} ({product.power_rating})
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell sx={styles.tableCell}>
                <ul>
                  {product.usage_tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
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

export default ProductsTable;
