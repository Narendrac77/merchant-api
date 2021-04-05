import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/buisness-info">
      <Translate contentKey="global.menu.entities.buisnessInfo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/business-legal">
      <Translate contentKey="global.menu.entities.businessLegal" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/business-legal-contact">
      <Translate contentKey="global.menu.entities.businessLegalContact" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/business-bank-acc">
      <Translate contentKey="global.menu.entities.businessBankAcc" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/file-model">
      <Translate contentKey="global.menu.entities.fileModel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/pan-details">
      <Translate contentKey="global.menu.entities.panDetails" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bank-details">
      <Translate contentKey="global.menu.entities.bankDetails" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/gstin-details">
      <Translate contentKey="global.menu.entities.gstinDetails" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/verification">
      <Translate contentKey="global.menu.entities.verification" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/panverification">
      <Translate contentKey="global.menu.entities.panverification" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bankverification">
      <Translate contentKey="global.menu.entities.bankverification" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/gstinverification">
      <Translate contentKey="global.menu.entities.gstinverification" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
