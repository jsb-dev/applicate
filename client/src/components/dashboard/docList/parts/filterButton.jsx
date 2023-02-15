import { DialogActions, DialogTitle } from '@mui/material';
import React from 'react';
import { Tooltip } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import StyledButton from '../../../shared/styledButton.jsx';
import StyledDialog from '../../../shared/styledDialog.jsx';
import CalendarIcon from '../../../../assets/icons/calendar.png';

function FilterButton({
  handleSubmit,
  show,
  setShow,
  selectedFilter,
  setSelectedFilter,
}) {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 960px)');

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const inputStyles = {
    margin: '5%',
  };

  const buttonStyles = {
    width: '40%',
    margin: '3%',
  };

  return (
    <>
      <Tooltip title="Filter documents">
        <StyledButton
          onClick={handleShow}
          style={{
            backgroundImage: `url(${CalendarIcon})`,
          }}
        ></StyledButton>
      </Tooltip>
      <StyledDialog open={show} onClose={handleClose}>
        <DialogTitle>Select a filter</DialogTitle>
        <DialogActions>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minWidth: isMobile ? '70vw' : isTablet ? '30vw' : '20vw',
            }}
          >
            <div>
              <input
                type="radio"
                id="dateModifiedNewest"
                name="filter"
                value="dateModifiedNewest"
                checked={selectedFilter === 'dateModifiedNewest'}
                onChange={(e) => setSelectedFilter(e.target.value)}
                style={inputStyles}
              />
              <label htmlFor="dateModifiedNewest">Newest to Oldest</label>
            </div>

            <div>
              <input
                type="radio"
                id="dateModifiedOldest"
                name="filter"
                value="dateModifiedOldest"
                checked={selectedFilter === 'dateModifiedOldest'}
                onChange={(e) => setSelectedFilter(e.target.value)}
                style={inputStyles}
              />
              <label htmlFor="dateModifiedOldest">Oldest to Newest</label>
            </div>

            <div>
              <input
                type="radio"
                id="fileNameAsc"
                name="filter"
                value="fileNameAsc"
                checked={selectedFilter === 'fileNameAsc'}
                onChange={(e) => setSelectedFilter(e.target.value)}
                style={inputStyles}
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
                style={inputStyles}
              />
              <label htmlFor="fileNameDesc">File Name (Z-A)</label>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: isTablet ? '10%' : '5%',
              }}
            >
              <StyledButton onClick={handleClose} style={buttonStyles}>
                <span>Cancel</span>
              </StyledButton>
              <StyledButton onClick={handleSubmit} style={buttonStyles}>
                <span>Apply</span>
              </StyledButton>
            </div>
          </div>
        </DialogActions>
      </StyledDialog>
    </>
  );
}

export default FilterButton;
