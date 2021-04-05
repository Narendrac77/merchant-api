package com.fss.onboard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fss.onboard.web.rest.TestUtil;

public class BusinessLegalTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessLegal.class);
        BusinessLegal businessLegal1 = new BusinessLegal();
        businessLegal1.setId(1L);
        BusinessLegal businessLegal2 = new BusinessLegal();
        businessLegal2.setId(businessLegal1.getId());
        assertThat(businessLegal1).isEqualTo(businessLegal2);
        businessLegal2.setId(2L);
        assertThat(businessLegal1).isNotEqualTo(businessLegal2);
        businessLegal1.setId(null);
        assertThat(businessLegal1).isNotEqualTo(businessLegal2);
    }
}
