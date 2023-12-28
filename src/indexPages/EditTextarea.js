import * as React from 'react';
import {
  DataGrid,
  useGridApiContext,
  GridCellEditStopReasons,
} from '@mui/x-data-grid';
import InputBase from '@mui/material/InputBase';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import TextareaAutosize from 'react-textarea-autosize';
function isKeyboardEvent(event) {
  return !!event.key;
}

function EditTextarea(props) {
  const { id, field, value, colDef, hasFocus } = props;
  const [valueState, setValueState] = React.useState(value);
  const [anchorEl, setAnchorEl] = React.useState();
  const [inputRef, setInputRef] = React.useState(null);
  const apiRef = useGridApiContext();
  const handleRef = React.useCallback((el) => {
    setAnchorEl(el);
  }, []);

  const handleChange = React.useCallback(
    (event) => {
      const newValue = event.target.value;
      setValueState(newValue);
      apiRef.current.setEditCellValue(
        { id, field, value: newValue.trim(), debounceMs: 200 },
        event,
      );
    },
    [apiRef, field, id],
  );

  return (
    <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
      <div
        ref={handleRef}
        style={{
          height: 1,
          width: colDef.computedWidth,
          display: 'block',
          position: 'relative',
          top: 0,
        }}
      />
      {anchorEl && (
        <Popper open anchorEl={anchorEl} placement="bottom-start">
          <Paper elevation={2} >
            <TextareaAutosize
              style={{ fontSize: '1.1em', fontFamily: "inherit", border: 'none' }}
              rows={4}
              value={valueState}
              sx={{ width: '100%' }}
              onChange={handleChange} />
          </Paper>

        </Popper>
      )}
    </div>
  );
}

export default React.memo(EditTextarea)