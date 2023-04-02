import { useEffect } from 'react';
import { IPath } from '../../models/interfaces';
import { useNavigate } from 'react-router';

const RedirectToPage = ({ path }: IPath) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [navigate, path]);

  return null;
};

export default RedirectToPage;
