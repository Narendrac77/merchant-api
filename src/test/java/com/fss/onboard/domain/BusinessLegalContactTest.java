package com.fss.onboard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fss.onboard.web.rest.TestUtil;

public class BusinessLegalContactTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessLegalContact.class);
        BusinessLegalContact businessLegalContact1 = new BusinessLegalContact();
        businessLegalContact1.setId(1L);
        BusinessLegalContact businessLegalContact2 = new BusinessLegalContact();
        businessLegalContact2.setId(businessLegalContact1.getId());
        assertThat(businessLegalContact1).isEqualTo(businessLegalContact2);
        businessLegalContact2.setId(2L);
        assertThat(businessLegalContact1).isNotEqualTo(businessLegalContact2);
        businessLegalContact1.setId(null);
        assertThat(businessLegalContact1).isNotEqualTo(businessLegalContact2);
    }
}
