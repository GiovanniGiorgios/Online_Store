import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import NewCategoryPopup from './Popups/NewSubCategoryPopup';
import { addNewSubCategory, deleteSubCategory } from '../../../../http/subCategoryApi';
import { deleteImage, uploadImage } from '../../../../http/fireBaseStorageUploadApi';
import EditSubCategoryPopup from './Popups/EditSubCategoryPopup';

function EditToolbar(props) {
  const { setRows, setRowModesModel, rows, updateData, open, handleClose, handleOpen, handleSave, newRecord, setNewRecord } = props;

  const handleClick = () => {
    handleOpen();
  };
  const handleClickUpdateTable = () => {
    updateData().then(data => setRows(data));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>

      <NewCategoryPopup 
        open={open} 
        handleClose={handleClose} 
        handleSave={handleSave} 
        newRecord={newRecord} 
        setNewRecord={setNewRecord} 
      />

      <Button color="primary" startIcon={<UpdateIcon />} onClick={handleClickUpdateTable}>
        Update table
      </Button>
    </GridToolbarContainer>
  );
}

const SubCategoriesInfoGrid = ({ data, updateData}) => {
  const [rows, setRows] = useState(data);
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({ nameOfSubCategory: '', subCategoryId: null });

  const [modalForEditIsOpen, setModalForEditIsOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const data = {
      nameOfSubCategory: newRecord.nameOfSubCategory,
      subCategoryId: newRecord.subCategoryId,
      existingImageId: newRecord.icon.id,
    };

    try {
      const { name, url} = await uploadImage(newRecord.icon, 'subCategories/');
      data.imageName = name;
      data.imageUrl = url;

      await addNewSubCategory(data);
      const updatedData = await updateData();
      setRows(updatedData);
    } catch (error) {
      console.error("Error handleSave: ", error.message);
    }
    setOpen(false);
    setNewRecord({ nameOfSubCategory: '', subCategoryId: null });
  };
  
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => { 
    const row = rows.find((row) => row.id === id);
    setCurrentRow(row);
    setModalForEditIsOpen(true);

    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id) => async() => {
    const subCategory = rows.find((row) => row.id === id);
    if (subCategory && subCategory.images && subCategory.images.length > 0) {
      const image = subCategory.images[0];
      const imagePath = 'subCategories/' + image.imgName;
      await deleteImage(imagePath);
    }

    await deleteSubCategory(id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    } 
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const processRowUpdate = async (newRow) => {
    let errors, isValid;

    if(newRow.isNew === true) {
      // ({ errors, isValid } = ValidationNewUserForm(newRow));
    } else {
      // ({ errors, isValid } = ValidationUpdateUserForm(newRow));
    }
    
    const updatedRow = { ...newRow, errors, isNew: false, createdAt: new Date().toISOString() };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
  };

  const handleProcessRowUpdateError = (error) => {
    console.error('Error during row update:', error);
    // Додаткова логіка обробки помилол
  };
  
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { 
      field: 'id',
      headerName: 'ID',
      width: 90 
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const hasError = params.row.errors && params.row.errors.name;
        return (
          <div>
            {params.value}
            {hasError && <div style={{ color: 'red' }}>{params.row.errors.name}</div>}
          </div>
        );
      },
    },
    {
      field: 'icon',
      headerName: 'Icon',
      width: 100,
      renderCell: (params) => {
        const hasError = params.row.errors && params.row.errors.image;
        const imageUrl = params.row.images[0]?.imgSrc || 'No image';
        return (
          <div>
            <img src={imageUrl} alt="No image" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
            {hasError && <div style={{ color: 'red' }}>{params.row.errors.image}</div>}
          </div>
        );
      },
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 200,
      editable: false,
      renderCell: (params) => {
        const hasError = params.row.errors && params.row.errors.image;
        return (
          <div>
            {params.row.images[0]?.imgName || 'No image'}
            {hasError && <div style={{ color: 'red' }}>{params.row.errors.image}</div>}
          </div>
        );
      },
    },
    {
      field: 'categoryId',
      headerName: 'Category',
      width: 150,
      renderCell: (params) => {
        const hasError = params.row.errors && params.row.errors.categoryId;
        return (
          <div>
            {params.row?.category?.name}
            {hasError && <div style={{ color: 'red' }}>{params.row.errors.categoryId}</div>}
          </div>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 180,
      valueGetter: (params) => {
          const formattedDateTime = new Date(params.row.createdAt).toLocaleString();
          return formattedDateTime;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { 
            setRows, 
            setRowModesModel, 
            rows, 
            updateData, 
            open, 
            handleClose, 
            handleSave, 
            newRecord, 
            setNewRecord,
            handleOpen
          },
        }}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
 
        <EditSubCategoryPopup 
          setModalForEditIsOpen={setModalForEditIsOpen}
          modalForEditIsOpen={modalForEditIsOpen}
          currentRow={currentRow}
          updateData={updateData}
          setRows={setRows}
        />

    </Box>
  );
}

export default SubCategoriesInfoGrid;