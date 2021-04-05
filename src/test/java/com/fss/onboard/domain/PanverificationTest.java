package com.fss.onboard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fss.onboard.web.rest.TestUtil;

public class PanverificationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Panverification.class);
        Panverification panverification1 = new Panverification();
        panverification1.setId(1L);
        Panverification panverification2 = new Panverification();
        panverification2.setId(panverification1.getId());
        assertThat(panverification1).isEqualTo(panverification2);
        panverification2.setId(2L);
        assertThat(panverification1).isNotEqualTo(panverification2);
        panverification1.setId(null);
        assertThat(panverification1).isNotEqualTo(panverification2);
    }
}
