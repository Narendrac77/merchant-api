package com.fss.onboard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fss.onboard.web.rest.TestUtil;

public class BusinessBankAccTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessBankAcc.class);
        BusinessBankAcc businessBankAcc1 = new BusinessBankAcc();
        businessBankAcc1.setId(1L);
        BusinessBankAcc businessBankAcc2 = new BusinessBankAcc();
        businessBankAcc2.setId(businessBankAcc1.getId());
        assertThat(businessBankAcc1).isEqualTo(businessBankAcc2);
        businessBankAcc2.setId(2L);
        assertThat(businessBankAcc1).isNotEqualTo(businessBankAcc2);
        businessBankAcc1.setId(null);
        assertThat(businessBankAcc1).isNotEqualTo(businessBankAcc2);
    }
}
