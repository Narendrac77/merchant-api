package com.fss.onboard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fss.onboard.web.rest.TestUtil;

public class BankverificationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bankverification.class);
        Bankverification bankverification1 = new Bankverification();
        bankverification1.setId(1L);
        Bankverification bankverification2 = new Bankverification();
        bankverification2.setId(bankverification1.getId());
        assertThat(bankverification1).isEqualTo(bankverification2);
        bankverification2.setId(2L);
        assertThat(bankverification1).isNotEqualTo(bankverification2);
        bankverification1.setId(null);
        assertThat(bankverification1).isNotEqualTo(bankverification2);
    }
}
