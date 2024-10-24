import {FormControl, OutlinedInput, InputAdornment} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { FC } from 'react';

interface PropsI {
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
};

const Search:FC<PropsI> = ({onChangeHandler}) => {
    return (
        <FormControl sx={{ width: "100%" }} variant="outlined">
            <OutlinedInput
                size="small"
                id="search"
                placeholder="Поиск…"
                sx={{ flexGrow: 1 }}
                onChange={(e) => onChangeHandler(e)}
                startAdornment={
                    <InputAdornment position="start" sx={{ color: 'text.primary' }} >
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />
        </FormControl>
    );
};

export default Search;