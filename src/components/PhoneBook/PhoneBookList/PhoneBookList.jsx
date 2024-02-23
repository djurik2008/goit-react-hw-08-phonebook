import css from './PhoneBookList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../../redux/myPhoneBook/contacts/contacs-operations';
import { selectFilteredContacts } from '../../../redux/myPhoneBook/contacts/contacts-selectors';
import Loader from 'components/Loader/Loader';
import DeleteButton from 'components/DeleteButton/DeleteButton';
import { Notify } from 'notiflix';

const PhoneBookList = () => {
  const { items, isLoading, error } = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const onDelete = id => () => dispatch(deleteContact(id));

  if (isLoading === 'addSucces') {
    Notify.success('Contact added');
  }

  if (error) {
    Notify.failure(error);
  }
  let loading = false;
  const elements = items.map(({ id, name, number }) => {
    if (isLoading === id) {
      loading = true;
      Notify.success('Contact deleted');
    }
    return (
      <li key={id} className={css.item}>
        {name}: {number}
        <DeleteButton loading={loading} func={onDelete(id)} />
      </li>
    );
  });
  return (
    <div>
      {isLoading === 'fetch' && <Loader />}
      {error && <p>{error}</p>}
      {Boolean(items.length) && <ul className={css.list}>{elements}</ul>}
    </div>
  );
};

export default PhoneBookList;
