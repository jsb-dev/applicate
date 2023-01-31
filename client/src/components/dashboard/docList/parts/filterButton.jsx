import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';
import { Tooltip } from '@mui/material';
import StyledButton from '../styled/styledButton.jsx';
import CalendarIcon from '../../../../assets/icons/calendar.png';

function FilterButton({
  handleSubmit,
  show,
  setShow,
  selectedFilter,
  setSelectedFilter,
}) {
  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip title="Filter documents">
        <StyledButton
          onClick={handleShow}
          style={{
            backgroundImage: `url(${CalendarIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 200,
              width: '100%',
              height: '100%',
            }}
          ></div>
        </StyledButton>
      </Tooltip>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Select a filter</DialogTitle>
        <DialogActions>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>
              <input
                type="radio"
                id="fileNameAsc"
                name="filter"
                value="fileNameAsc"
                checked={selectedFilter === 'fileNameAsc'}
                onChange={(e) => setSelectedFilter(e.target.value)}
              />
              <label htmlFor="fileNameAsc">File Name (A-Z)</label>
            </div>

            <div>
              <input
                type="radio"
                id="fileNameDesc"
                name="filter"
                value="fileNameDesc"
                checked={selectedFilter === 'fileNameDesc'}
                onChange={(e) => setSelectedFilter(e.target.value)}
              />
              <label htmlFor="fileNameDesc">File Name (Z-A)</label>
            </div>

            <div>
              <input
                type="radio"
                id="dateModifiedOldest"
                name="filter"
                value="dateModifiedOldest"
                checked={selectedFilter === 'dateModifiedOldest'}
                onChange={(e) => setSelectedFilter(e.target.value)}
              />
              <label htmlFor="dateModifiedOldest">
                Date Modified (Oldest to Newest)
              </label>
            </div>

            <div>
              <input
                type="radio"
                id="dateModifiedNewest"
                name="filter"
                value="dateModifiedNewest"
                checked={selectedFilter === 'dateModifiedNewest'}
                onChange={(e) => setSelectedFilter(e.target.value)}
              />
              <label htmlFor="dateModifiedNewest">
                Date Modified (Newest to Oldest)
              </label>
            </div>

            <StyledButton onClick={handleSubmit}>
              <span>Apply</span>
            </StyledButton>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FilterButton;
