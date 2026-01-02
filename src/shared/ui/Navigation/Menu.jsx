import { NavLink } from 'react-router-dom';
import { AiFillBank, AiOutlineCreditCard } from 'react-icons/ai';
import { MdAttachMoney, MdOutlineLocalAtm } from 'react-icons/md';
import { TbMoneybag } from 'react-icons/tb';
import { BiSolidReport } from 'react-icons/bi';
import { GiPayMoney } from 'react-icons/gi';
import { GrTransaction, GrAtm, GrMoney } from 'react-icons/gr';
import { IoIosHome, IoIosSettings, IoIosPaperPlane, IoMdEye } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { ROUTES } from '@shared/config/constants';
import './Menu.css';

function Menu() {
    return (
        <nav className="menu-container">
            <ul className="menu">
                <li>
                    <NavLink to={ROUTES.HOME}>
                        <IoIosHome className="menu-icon" />
                        Inicio
                    </NavLink>
                </li>

                <li>
                    <NavLink to={ROUTES.ACCOUNT.BALANCE}>
                        <IoIosSettings className="menu-icon" />
                        Gestionar
                    </NavLink>
                    <ul className="submenu">
                        <li>
                            <NavLink to={ROUTES.ACCOUNT.BALANCE}>
                                <IoMdEye className="submenu-icon" />
                                Ver saldo
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.ACCOUNT.MOVEMENTS}>
                                <GrTransaction className="submenu-icon" />
                                Movimientos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.ACCOUNT.PROFILE}>
                                <CgProfile className="submenu-icon" />
                                Detalle perfil
                            </NavLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <NavLink to={ROUTES.TRANSACTIONS.TRANSFER}>
                        <IoIosPaperPlane className="menu-icon" />
                        Transacciones
                    </NavLink>
                    <ul className="submenu">
                        <li>
                            <NavLink to={ROUTES.TRANSACTIONS.TRANSFER}>
                                <MdAttachMoney className="submenu-icon" />
                                Transferir dinero
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.TRANSACTIONS.DEPOSIT}>
                                <MdOutlineLocalAtm className="submenu-icon" />
                                Depositar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.TRANSACTIONS.WITHDRAW}>
                                <GrAtm className="submenu-icon" />
                                Retirar
                            </NavLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <NavLink to={ROUTES.LOANS.REQUEST}>
                        <AiFillBank className="menu-icon" />
                        Préstamos
                    </NavLink>
                    <ul className="submenu">
                        <li>
                            <NavLink to={ROUTES.LOANS.REQUEST}>
                                <AiOutlineCreditCard className="submenu-icon" />
                                Solicitar préstamo
                            </NavLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <NavLink to={ROUTES.REPORTS.INCOME}>
                        <BiSolidReport className="menu-icon" />
                        Reportes
                    </NavLink>
                    <ul className="submenu">
                        <li>
                            <NavLink to={ROUTES.REPORTS.INCOME}>
                                <GrMoney className="submenu-icon" />
                                Total ingresos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.REPORTS.EXPENSES}>
                                <TbMoneybag className="submenu-icon" />
                                Total egresos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.REPORTS.DEBTS}>
                                <GiPayMoney className="submenu-icon" />
                                Deudas
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;
