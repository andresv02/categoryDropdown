import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { ListItemText, Box } from '@mui/material';

const airlines = [
  'Aerolineas Argentinas', 'Aeromexico', 'American', 'Avianca',
  'Azul', 'COPA', 'Delta', 'Emirates', 'Gol', 'KLM', 'LATAM',
];

export default function MultiSelectDropdown() {
  const [selectedAirlines, setSelectedAirlines] = React.useState([]);

  const handleOnlyClick = (option) => {
    setSelectedAirlines([option]);
  };

  const handleSelectAllClick = () => {
    setSelectedAirlines(selectedAirlines.length === airlines.length ? [] : airlines);
  };

  return (
    <Autocomplete
      multiple
      options={['Select All', ...airlines]}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      getOptionDisabled={(option) => option === 'Select All' && selectedAirlines.length === airlines.length}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            checked={selectedAirlines.includes(option)}
            onChange={() => {
              if (option !== 'Select All') {
                setSelectedAirlines((prevSelected) =>
                  prevSelected.includes(option)
                    ? prevSelected.filter((item) => item !== option)
                    : [...prevSelected, option]
                );
              }
            }}
          />
          <ListItemText primary={option} />
          {option !== 'Select All' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOnlyClick(option);
              }}
              style={{ marginLeft: 'auto' }}
            >
              Only
            </button>
          )}
        </li>
      )}
      style={{ width: 300 }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Box key={index} {...getTagProps({ index })}>
            {option}
          </Box>
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Airlines"
          value={selectedAirlines.join(', ')}
        />
      )}
      value={selectedAirlines}
      onChange={(event, newValue) => {
        if (newValue.includes('Select All')) {
          handleSelectAllClick();
        } else {
          setSelectedAirlines(newValue);
        }
      }}
    />
  );
}
