import { alpha, InputBase, styled } from "@mui/material";
import React, { FunctionComponent } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "5px",
  marginTop: "5px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: "#e2e5e7",
  },
  marginLeft: 0,
  width: "100%",
  border: "1px solid",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const SearchComponent: FunctionComponent<SearchProps> = ({ onChange }) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        defaultValue=""
        id="search-box"
        onChange={onChange}
      />
    </Search>
  );
};

export default SearchComponent;
