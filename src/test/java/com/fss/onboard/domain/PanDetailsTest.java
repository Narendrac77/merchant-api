package com.fss.onboard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fss.onboard.web.rest.TestUtil;

public class PanDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PanDetails.class);
        PanDetails panDetails1 = new PanDetails();
        panDetails1.setId(1L);
        PanDetails panDetails2 = new PanDetails();
        panDetails2.setId(panDetails1.getId());
        assertThat(panDetails1).isEqualTo(panDetails2);
        panDetails2.setId(2L);
        assertThat(panDetails1).isNotEqualTo(panDetails2);
        panDetails1.setId(null);
        assertThat(panDetails1).isNotEqualTo(panDetails2);
    }
}
