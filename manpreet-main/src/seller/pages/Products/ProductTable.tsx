// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { IconButton, styled } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { fetchSellerProducts, updateProduct, deleteProduct } from '../../../Redux Toolkit/Seller/sellerProductSlice';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Dialog from '@mui/material/Dialog';
// import AddProductForm from './AddProductForm';
// import { type Product } from '../../../types/productTypes';



// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// export default function ProductTable() {

//   const { sellerProduct } = useAppSelector(store => store);
//   const dispatch = useAppDispatch();
//   const [editDialogOpen, setEditDialogOpen] = React.useState(false);
//   const [editProduct, setEditProduct] = React.useState<Product | null>(null);


//   React.useEffect(() => {
//     dispatch(fetchSellerProducts(localStorage.getItem("jwt")))
//   }, [])

//   const handleEditClick = (product: Product) => {
//     setEditProduct(product);
//     setEditDialogOpen(true);
//   };
//   const handleEditDialogClose = () => {
//     setEditDialogOpen(false);
//     setEditProduct(null);
//   };
//   const handleEditSubmit = (values: any) => {
//     if (editProduct && editProduct._id) {
//       dispatch(updateProduct({ productId: editProduct._id, product: values }));
//       setEditDialogOpen(false);
//       setEditProduct(null);
//     }
//   };
//   const handleDeleteClick = (productId: string) => {
//     dispatch(deleteProduct(productId));
//   };


//   return (
//     <>
//       <h1 className='pb-5 font-bold text-xl'>Products</h1>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Images</StyledTableCell>
//               <StyledTableCell align="right">Title</StyledTableCell>
//               <StyledTableCell align="right">MRP</StyledTableCell>
//               <StyledTableCell align="right">Selling Price</StyledTableCell>
//               <StyledTableCell align="right">Color</StyledTableCell>
//               <StyledTableCell align="right">Stock</StyledTableCell>
//               <StyledTableCell align="right">Update</StyledTableCell>
//               <StyledTableCell align="right">Delete</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sellerProduct.products.map((item) => (
//               <StyledTableRow key={item._id}>
//                 <StyledTableCell component="th" scope="row">
//                   <div className='flex gap-1 flex-wrap'>
//                     {item.images.map((image) => <img className='w-20 rounded-md' src={image} alt="" />)}

//                   </div>
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{item.title}</StyledTableCell>
//                 <StyledTableCell align="right"> ₹{item.mrpPrice}.0</StyledTableCell>
//                 <StyledTableCell align="right"> ₹{item.sellingPrice}.0</StyledTableCell>
//                 <StyledTableCell align="right">{item.color}</StyledTableCell>
//                 <StyledTableCell align="right">{item.quantity ?? 0}</StyledTableCell>
//                 <StyledTableCell align="right">
//                   <IconButton color='primary' className='bg-primary-color' onClick={() => handleEditClick(item)}>
//                     <EditIcon />
//                   </IconButton>
//                 </StyledTableCell>
//                 <StyledTableCell align="right">
//                   <IconButton
//                     color="error"
//                     onClick={() => item._id && handleDeleteClick(item._id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>

//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth="md" fullWidth>
//         {editProduct && (
//           <AddProductForm
//             initialValues={{ ...editProduct, images: editProduct.images || [] }}
//             mode="edit"
//             onSubmit={handleEditSubmit}
//             onClose={handleEditDialogClose}
//           />
//         )}
//       </Dialog>
//     </>

//   );
// }










// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { IconButton, styled } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { fetchSellerProducts, updateProduct, deleteProduct } from '../../../Redux Toolkit/Seller/sellerProductSlice';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Dialog from '@mui/material/Dialog';
// import AddProductForm from './AddProductForm';
// import { type Product } from '../../../types/productTypes';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// export default function ProductTable() {
//   const { sellerProduct } = useAppSelector(store => store);
//   const dispatch = useAppDispatch();
//   const [editDialogOpen, setEditDialogOpen] = React.useState(false);
//   const [editProduct, setEditProduct] = React.useState<Product | null>(null);

//   React.useEffect(() => {
//     dispatch(fetchSellerProducts(localStorage.getItem("jwt")));
//   }, []);

//   const handleEditClick = (product: Product) => {
//     setEditProduct(product);
//     setEditDialogOpen(true);
//   };
//   const handleEditDialogClose = () => {
//     setEditDialogOpen(false);
//     setEditProduct(null);
//   };
//   const handleEditSubmit = (values: any) => {
//     if (editProduct && editProduct._id) {
//       dispatch(updateProduct({ productId: editProduct._id, product: values }));
//       setEditDialogOpen(false);
//       setEditProduct(null);
//     }
//   };
//   const handleDeleteClick = (productId: string) => {
//     dispatch(deleteProduct(productId));
//   };

//   return (
//     <>
//       <h1 className='pb-5 font-bold text-xl'>Products</h1>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Images</StyledTableCell>
//               <StyledTableCell align="right">Title</StyledTableCell>
//               <StyledTableCell align="right">MRP</StyledTableCell>
//               <StyledTableCell align="right">Selling Price</StyledTableCell>
//               <StyledTableCell align="right">Color</StyledTableCell>
//               <StyledTableCell align="right">Sizes</StyledTableCell>
//               <StyledTableCell align="right">Stock</StyledTableCell>
//               <StyledTableCell align="right">Update</StyledTableCell>
//               <StyledTableCell align="right">Delete</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sellerProduct.products.map((item) => (
//               <StyledTableRow key={item._id}>
//                 <StyledTableCell component="th" scope="row">
//                   <div className='flex gap-1 flex-wrap'>
//                     {item.images.map((image, idx) => (
//                       <img className='w-20 rounded-md' key={idx} src={image} alt="" />
//                     ))}
//                   </div>
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{item.title}</StyledTableCell>
//                 <StyledTableCell align="right">₹{item.mrpPrice}.0</StyledTableCell>
//                 <StyledTableCell align="right">₹{item.sellingPrice}.0</StyledTableCell>
//                 <StyledTableCell align="right">{item.color}</StyledTableCell>
//                 <StyledTableCell align="right">
//                   {Array.isArray(item.sizes) ? item.sizes.join(', ') : (item.sizes || 'N/A')}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{item.quantity ?? 0}</StyledTableCell>
//                 <StyledTableCell align="right">
//                   <IconButton color='primary' onClick={() => handleEditClick(item)}>
//                     <EditIcon />
//                   </IconButton>
//                 </StyledTableCell>
//                 <StyledTableCell align="right">
//                   <IconButton
//                     color="error"
//                     onClick={() => item._id && handleDeleteClick(item._id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth="md" fullWidth>
//         {editProduct && (
//           <AddProductForm
//             initialValues={{ ...editProduct, images: editProduct.images || [] }}
//             mode="edit"
//             onSubmit={handleEditSubmit}
//             onClose={handleEditDialogClose}
//           />
//         )}
//       </Dialog>
//     </>
//   );
// }






// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { IconButton, styled } from '@mui/material';
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import {
//   fetchSellerProducts,
//   updateProduct,
//   deleteProduct,
// } from '../../../Redux Toolkit/Seller/sellerProductSlice';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Dialog from '@mui/material/Dialog';
// import AddProductForm from './AddProductForm';
// import { type Product } from '../../../types/productTypes';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// export default function ProductTable() {
//   const { sellerProduct } = useAppSelector((store) => store);
//   const dispatch = useAppDispatch();
//   const [editDialogOpen, setEditDialogOpen] = React.useState(false);
//   const [editProduct, setEditProduct] = React.useState<Product | null>(null);

//   React.useEffect(() => {
//     dispatch(fetchSellerProducts(localStorage.getItem("jwt")) as any);
//   }, [dispatch]);

//   const handleEditClick = (product: Product) => {
//     setEditProduct(product);
//     setEditDialogOpen(true);
//   };
//   const handleEditDialogClose = () => {
//     setEditDialogOpen(false);
//     setEditProduct(null);
//   };
//   const handleEditSubmit = (values: any) => {
//     if (editProduct && editProduct._id) {
//       dispatch(updateProduct({ productId: editProduct._id, product: values }) as any);
//       setEditDialogOpen(false);
//       setEditProduct(null);
//     }
//   };
//   const handleDeleteClick = (productId: string) => {
//     dispatch(deleteProduct(productId) as any);
//   };

//   return (
//     <>
//       <h1 className="pb-5 font-bold text-xl">Products</h1>

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Images</StyledTableCell>
//               <StyledTableCell align="right">Title</StyledTableCell>
//               <StyledTableCell align="right">Brand</StyledTableCell>
//               <StyledTableCell align="right">MRP</StyledTableCell>
//               <StyledTableCell align="right">Selling Price</StyledTableCell>
//               <StyledTableCell align="right">Color</StyledTableCell>
//               <StyledTableCell align="right">Sizes</StyledTableCell>
//               <StyledTableCell align="right">Stock</StyledTableCell>
//               <StyledTableCell align="right">Update</StyledTableCell>
//               <StyledTableCell align="right">Delete</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sellerProduct.products.map((item: any) => (
//               <StyledTableRow key={item._id}>
//                 <StyledTableCell component="th" scope="row">
//                   <div className="flex gap-1 flex-wrap">
//                     {item.images.map((image: string, idx: number) => (
//                       <img className="w-20 rounded-md" key={idx} src={image} alt="" />
//                     ))}
//                   </div>
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{item.title}</StyledTableCell>

//                 {/* 🔥 BRAND */}
//                 <StyledTableCell align="right">
//                   {typeof item.brand === 'object'
//                     ? item.brand?.name
//                     : item.brand || '—'}
//                 </StyledTableCell>

//                 <StyledTableCell align="right">₹{item.mrpPrice}.0</StyledTableCell>
//                 <StyledTableCell align="right">₹{item.sellingPrice}.0</StyledTableCell>
//                 <StyledTableCell align="right">{item.color}</StyledTableCell>
//                 <StyledTableCell align="right">
//                   {Array.isArray(item.sizes)
//                     ? item.sizes.join(', ')
//                     : item.sizes || 'N/A'}
//                 </StyledTableCell>

//                 {/* 🔥 STOCK with OUT OF STOCK badge */}
//                 <StyledTableCell align="right">
//                   {(item.quantity ?? 0) > 0 ? (
//                     <div className="flex items-center gap-2 justify-end">
//                       <span className="w-2 h-2 rounded-full bg-green-500"></span>
//                       <span className="font-semibold text-green-700 text-xs">
//                         {item.quantity} available
//                       </span>
//                     </div>
//                   ) : (
//                     <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
//                       🔴 OUT OF STOCK
//                     </span>
//                   )}
//                 </StyledTableCell>

//                 <StyledTableCell align="right">
//                   <IconButton color="primary" onClick={() => handleEditClick(item)}>
//                     <EditIcon />
//                   </IconButton>
//                 </StyledTableCell>
//                 <StyledTableCell align="right">
//                   <IconButton
//                     color="error"
//                     onClick={() => item._id && handleDeleteClick(item._id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog
//         open={editDialogOpen}
//         onClose={handleEditDialogClose}
//         maxWidth="md"
//         fullWidth
//       >
//         {editProduct && (
//           <AddProductForm
//             initialValues={{ ...editProduct, images: editProduct.images || [] }}
//             mode="edit"
//             onSubmit={handleEditSubmit}
//             onClose={handleEditDialogClose}
//           />
//         )}
//       </Dialog>
//     </>
//   );
// }







import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip, IconButton, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import {
  fetchSellerProducts,
  updateProduct,
  deleteProduct,
} from '../../../Redux Toolkit/Seller/sellerProductSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BrushIcon from '@mui/icons-material/Brush';
import Dialog from '@mui/material/Dialog';
import AddProductForm from './AddProductForm';
import { type Product } from '../../../types/productTypes';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ProductTable() {
  const { sellerProduct } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    dispatch(fetchSellerProducts(localStorage.getItem("jwt")) as any);
  }, [dispatch]);

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
    setEditDialogOpen(true);
  };
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditProduct(null);
  };
  const handleEditSubmit = (values: any) => {
    if (editProduct && editProduct._id) {
      dispatch(updateProduct({ productId: editProduct._id, product: values }) as any);
      setEditDialogOpen(false);
      setEditProduct(null);
    }
  };
  const handleDeleteClick = (productId: string) => {
    dispatch(deleteProduct(productId) as any);
  };

  return (
    <>
      <h1 className="pb-5 font-bold text-xl">Products</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Images</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Brand</StyledTableCell>
              <StyledTableCell align="right">MRP</StyledTableCell>
              <StyledTableCell align="right">Selling Price</StyledTableCell>
              <StyledTableCell align="right">Color</StyledTableCell>
              <StyledTableCell align="right">Sizes</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProduct.products.map((item: any) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell component="th" scope="row">
                  <div className="flex gap-1 flex-wrap">
                    {item.images.map((image: string, idx: number) => (
                      <img className="w-20 rounded-md" key={idx} src={image} alt="" />
                    ))}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">{item.title}</StyledTableCell>

                <StyledTableCell align="right">
                  {typeof item.brand === 'object'
                    ? item.brand?.name
                    : item.brand || '—'}
                </StyledTableCell>

                <StyledTableCell align="right">₹{item.mrpPrice}.0</StyledTableCell>
                <StyledTableCell align="right">₹{item.sellingPrice}.0</StyledTableCell>
                <StyledTableCell align="right">{item.color}</StyledTableCell>
                <StyledTableCell align="right">
                  {Array.isArray(item.sizes)
                    ? item.sizes.join(', ')
                    : item.sizes || 'N/A'}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {(item.quantity ?? 0) > 0 ? (
                    <div className="flex items-center gap-2 justify-end">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="font-semibold text-green-700 text-xs">
                        {item.quantity} available
                      </span>
                    </div>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      🔴 OUT OF STOCK
                    </span>
                  )}
                </StyledTableCell>

                {/* 🔥 CUSTOM PRODUCT BADGE */}
                <StyledTableCell align="center">
                  {item.isCustomizable ? (
                    <Chip
                      icon={<BrushIcon sx={{ fontSize: 14 }} />}
                      label="Custom"
                      size="small"
                      sx={{
                        bgcolor: "#fed7aa",
                        color: "#9a3412",
                        fontWeight: 700,
                        fontSize: 11,
                      }}
                    />
                  ) : (
                    <Chip
                      label="Regular"
                      size="small"
                      sx={{
                        bgcolor: "#f3f4f6",
                        color: "#6b7280",
                        fontSize: 11,
                      }}
                    />
                  )}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <IconButton color="primary" onClick={() => handleEditClick(item)}>
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => item._id && handleDeleteClick(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        maxWidth="md"
        fullWidth
      >
        {editProduct && (
          <AddProductForm
            initialValues={{ ...editProduct, images: editProduct.images || [] }}
            mode="edit"
            onSubmit={handleEditSubmit}
            onClose={handleEditDialogClose}
          />
        )}
      </Dialog>
    </>
  );
}